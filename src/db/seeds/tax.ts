import type db from '@/db';
import { taxRecords } from '../schema';
import { faker } from '@faker-js/faker';

const taxStatuses = ['Paid', 'Unpaid', 'Pending', 'Overdue'];

function generateRandomTaxDetails() {
  const numRecords = faker.number.int({ min: 1, max: 5 }); // Random number of tax records between 1 and 5
  const records = [];
  for (let i = 0; i < numRecords; i++) {
    const taxStatus = faker.helpers.arrayElement(taxStatuses);
    const taxYear = faker.date.past({ years: 10 }).getFullYear(); // Random year in the past 10 years

    records.push({
      taxYear: taxYear,
      taxAmount: faker.finance.amount({ min: 100, max: 10000, dec: 2 }),
      taxStatus: taxStatus,
    });
  }
  return records;
}

async function generateTaxRecords(startId, endId) {
  const taxRecordsArray = [];

  for (let i = startId; i < endId; i++) {
    const personId = i + 1; // Assuming person_id starts from 1 and is sequential
    const records = generateRandomTaxDetails();

    records.forEach(recordDetails => {
      const newTaxRecord = {
        person_id: personId,
        taxYear: recordDetails.taxYear,
        taxAmount: recordDetails.taxAmount,
        taxStatus: recordDetails.taxStatus,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      taxRecordsArray.push(newTaxRecord);
    });
  }

  return taxRecordsArray;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 8500000; // Total number of persons you have
  const totalChunks = Math.ceil(totalRecords / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const startId = i * chunkSize;
    const endId = Math.min(startId + chunkSize, totalRecords);
    const taxRecordsArray = await generateTaxRecords(startId, endId);

    await db.insert(taxRecords).values(taxRecordsArray);
    console.log(`Inserted tax records for persons ${startId + 1} to ${endId}`);
  }
}
