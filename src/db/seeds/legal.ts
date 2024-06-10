import type db from '@/db';
import { legal } from '../schema';
import { faker } from '@faker-js/faker';

const caseTypes = ['Civil', 'Criminal', 'Family', 'Labor', 'Property'];
const caseStatuses = ['Open', 'Closed', 'Pending', 'Appealed'];

function generateRandomCaseDetails() {
  const numCases = faker.number.int({ min: 1, max: 5 }); // Random number of cases between 1 and 5
  const cases = [];
  for (let i = 0; i < numCases; i++) {
    const caseType = faker.helpers.arrayElement(caseTypes);
    const caseStatus = faker.helpers.arrayElement(caseStatuses);
    const filingDate = faker.date.past({ years: 5 }).toISOString();
    const resolutionDate = caseStatus === 'Closed' ? faker.date.future({ years: 2 }).toISOString() : null;

    cases.push({
      caseNumber: faker.string.alphanumeric(10),
      caseType: caseType,
      caseStatus: caseStatus,
      filingDate: filingDate,
      resolutionDate: resolutionDate,
      details: faker.lorem.paragraph(),
    });
  }
  return cases;
}

async function generateLegalRecords(startId, endId) {
  const legalRecords = [];

  for (let i = startId; i < endId; i++) {
    const personId = i + 1; // Assuming person_id starts from 1 and is sequential
    const cases = generateRandomCaseDetails();

    cases.forEach(caseDetails => {
      const newLegalRecord = {
        person_id: personId,
        caseNumber: caseDetails.caseNumber,
        caseType: caseDetails.caseType,
        caseStatus: caseDetails.caseStatus,
        filingDate: caseDetails.filingDate,
        resolutionDate: caseDetails.resolutionDate,
        details: caseDetails.details,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      legalRecords.push(newLegalRecord);
    });
  }

  return legalRecords;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 8500000; // Total number of persons you have
  const totalChunks = Math.ceil(totalRecords / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const startId = i * chunkSize;
    const endId = Math.min(startId + chunkSize, totalRecords);
    const legalRecords = await generateLegalRecords(startId, endId);

    await db.insert(legal).values(legalRecords);
    console.log(`Inserted legal records for persons ${startId + 1} to ${endId}`);
  }
}
