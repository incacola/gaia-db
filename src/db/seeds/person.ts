import type db from '@/db';
import { person } from '../schema';
import { faker } from '@faker-js/faker';

const persons = [];

for (let i = 168000; i < 172000; i++) {
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
    email: faker.internet.email({firstName: fakerFirstName, lastName: fakerLastName}),
    phone: faker.phone.number(),
    socialSecurityNumber: `${faker.number.int({ min: 100, max: 500 })}-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
    taxId: `GAT-${faker.number.int({ min: 100, max: 500 })}-${faker.number.int({ min: 10, max: 99 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

export default async function seed(db: db) {
  await db.insert(person).values(persons);
}
