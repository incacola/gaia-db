import type db from '@/db';
import { healthRecords } from '../schema';
import { faker } from '@faker-js/faker';

const healthRecordTypes = ['Allergy', 'Immunization', 'Lab Result', 'Medication', 'Visit', 'Surgery'];

function generateRandomHealthDetails() {
  const numRecords = faker.number.int({ min: 1, max: 5 }); // Random number of health records between 1 and 5
  const records = [];
  for (let i = 0; i < numRecords; i++) {
    const healthRecordType = faker.helpers.arrayElement(healthRecordTypes);
    const recordDate = faker.date.past({ years: 10 }).toISOString();

    records.push({
      healthRecordType: healthRecordType,
      description: faker.lorem.paragraph(),
      recordDate: recordDate,
    });
  }
  return records;
}

async function generateHealthRecords(startId, endId) {
  const healthRecordsArray = [];

  for (let i = startId; i < endId; i++) {
    const personId = i + 1; // Assuming person_id starts from 1 and is sequential
    const records = generateRandomHealthDetails();

    records.forEach(recordDetails => {
      const newHealthRecord = {
        person_id: personId,
        healthRecordType: recordDetails.healthRecordType,
        description: recordDetails.description,
        recordDate: recordDetails.recordDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      healthRecordsArray.push(newHealthRecord);
    });
  }

  return healthRecordsArray;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 8500000; // Total number of persons you have
  const totalChunks = Math.ceil(totalRecords / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const startId = i * chunkSize;
    const endId = Math.min(startId + chunkSize, totalRecords);
    const healthRecordsArray = await generateHealthRecords(startId, endId);

    await db.insert(healthRecords).values(healthRecordsArray);
    console.log(`Inserted health records for persons ${startId + 1} to ${endId}`);
  }
}
