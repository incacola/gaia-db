import { pgTable, serial, varchar, index, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import person from './person';

const identification = pgTable(
  'identification',
  {
    identification_id: serial('identification_id').primaryKey(),
    person_id: serial('address_person_id').references(() => person.id),
    type: varchar('type', { length: 255 }).notNull(),
    idNumber: varchar('id_number', { length: 255 }).notNull(),
    issueDate: timestamp('issue_date', { mode: "string" }).notNull().defaultNow(),
    expirationDate: timestamp('expiration_date', { mode: "string" }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      identificationIdIdx: index('identification_id_idx').on(table.identification_id),
      identificationPersonIdx: index('identification_person_idx').on(table.person_id)
    };
  },
);

export const identificationRelations = relations(identification, ({ many}) =>({
  person: many(person),
}));

export default identification;