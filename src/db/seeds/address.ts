import type db from '@/db';
import { address } from '../schema';
import { faker } from '@faker-js/faker';

async function generateAddresses(startId, endId) {
  const addresses = [];

  for (let i = startId; i < endId; i++) {
    const newAddress = {
      person_id: i + 1,  // Assuming person_id starts from 1 and is sequential
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      country: faker.location.country(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    addresses.push(newAddress);
  }

  return addresses;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 8500000; // Total number of persons you have
  const totalChunks = Math.ceil(totalRecords / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const startId = i * chunkSize;
    const endId = Math.min(startId + chunkSize, totalRecords);
    const addresses = await generateAddresses(startId, endId);

    await db.insert(address).values(addresses);
    console.log(`Inserted addresses for persons ${startId + 1} to ${endId}`);
  }
}
