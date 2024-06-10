import type db from '@/db';
import { person } from '../schema';
import { faker } from '@faker-js/faker';

async function generatePersons(startId, endId, usedSSNs) {
  const persons = [];

  function generateUniqueSSN() {
    let ssn;
    do {
      ssn = `${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000, max: 9999 })}`;
    } while (usedSSNs.has(ssn));
    usedSSNs.add(ssn);
    return ssn;
  }

  for (let i = startId; i < endId; i++) {
    const count = i + 1;
    const gender = faker.person.sexType();
    const fakerFirstName = faker.person.firstName(gender);
    const fakerLastName = faker.person.lastName(gender);

    persons.push({
      id: count,
      firstName: fakerFirstName,
      lastName: fakerLastName,
      birthday: faker.date.birthdate({ min: 1, max: 97, mode: 'age' }).toISOString(),
      gender: gender,
      email: faker.internet.email({ firstName: fakerFirstName, lastName: fakerLastName }),
      phone: faker.phone.number(),
      socialSecurityNumber: generateUniqueSSN(),
      taxId: `GAT-${faker.number.int({ min: 100, max: 999 })}-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  return persons;
}

export default async function seed(db: db) {
  const chunkSize = 4000;
  const totalRecords = 0 + 8500000;
  const usedSSNs = new Set();

  for (let i = 0; i < totalRecords; i += chunkSize) {
    const startId = 0 + i;
    const endId = Math.min(0 + i + chunkSize, 8500000);
    const persons = await generatePersons(startId, endId, usedSSNs);

    await db.insert(person).values(persons);
  }
}
