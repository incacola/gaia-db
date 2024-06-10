import { pgTable, serial, varchar, index, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import person from './person';

const address = pgTable(
  'address',
  {
    address_id: serial('address_id').primaryKey(),
    person_id: serial('address_person_id').references(() => person.id),
    street: varchar('street', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    state: varchar('state', { length: 255 }).notNull(),
    zip: varchar('zip', { length: 255 }).notNull(),
    country: varchar('country', { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      addressIdIdx: index('address_id_idx').on(table.address_id),
      addressPersonIdx: index('address_person_idx').on(table.person_id)
    };
  },
);

export const addressRelations = relations(address, ({ many}) =>({
  person: many(person),
}));

export default address;