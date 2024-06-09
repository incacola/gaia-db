import fs from 'fs';
import { faker } from '@faker-js/faker';

const persons = [];

for (let i = 0; i < 3500000; i++) {
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

let flightsJson = JSON.stringify(persons);

fs.writeFile('./src/db/seeds/data/persons.json', flightsJson, (err) => {
    if (err) {
        console.log('Error writing file:', err);
    } else {
        console.log('Successfully wrote file');
    }
});