import type db from '@/db';
import { identification } from '../schema';
import { faker } from '@faker-js/faker';

const documentTypes = ['Passport', 'Driver\'s License', 'National ID'];

function generateRandomDocumentTypes() {
  const numDocuments = faker.number.int({ min: 1, max: 4 }); // Random number of documents between 1 and 4
  const selectedTypes = new Set();
  while (selectedTypes.size < numDocuments) {
    const randomType = faker.helpers.arrayElement(documentTypes);
    selectedTypes.add(randomType);
  }
  return Array.from(selectedTypes);
}

async function generateIdentifications(startId, endId) {
  const identifications = [];

  for (let i = startId; i < endId; i++) {
    const personId = i + 1; // Assuming person_id starts from 1 and is sequential
    const documentTypes = generateRandomDocumentTypes();

    documentTypes.forEach(type => {
      const newIdentification = {
        person_id: personId,
        type: type,
        idNumber: faker.string.alphanumeric(10),
        issueDate: faker.date.past({ years: 2 }).toISOString(),
        expirationDate: faker.date.future({ years: 4 }).toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      identifications.push(newIdentification);
    });
  }

  return identifications;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 8500000; // Total number of persons you have
  const totalChunks = Math.ceil(totalRecords / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const startId = i * chunkSize;
    const endId = Math.min(startId + chunkSize, totalRecords);
    const identifications = await generateIdentifications(startId, endId);

    await db.insert(identification).values(identifications);
    console.log(`Inserted identifications for persons ${startId + 1} to ${endId}`);
  }
}
