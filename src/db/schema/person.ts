import { date, pgTable, serial, varchar, index, timestamp } from 'drizzle-orm/pg-core';

const person = pgTable(
  'person',
  {
    id: serial('person_id').primaryKey(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    birthday: timestamp('birthday', { mode: "string" }).notNull().defaultNow(),
    gender: varchar('gender', { length: 10 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    phone: varchar('phone', { length: 255 }),
    socialSecurityNumber: varchar('social_security_number', {
      length: 20,
    })
      .unique()
      .notNull(),
    taxId: varchar('tax_id', { length: 20 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      idIdx: index('person_id_idx').on(table.id),
      firstNameIdx: index('person_first_name_idx').on(table.firstName),
      lastNameIdx: index('person_last_name_idx').on(table.lastName),
    };
  },
);

export default person;