import { pgTable, serial, varchar, index, timestamp, integer,date,text,decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import person from './person';

const taxRecords = pgTable(
  'taxRecords',
  {
    tax_id: serial('tax_id').primaryKey(),
    person_id: integer('person_id').references(() => person.id),
    taxYear: integer('tax_year'),
    taxAmount: decimal('tax_amount', { precision: 10, scale: 2 }),
    taxStatus: varchar('tax_status', { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      taxRecordsIdIdx: index('taxRecords_id_idx').on(table.tax_id),
      taxRecordsPersonIdx: index('taxRecords_person_idx').on(table.person_id)
    };
  },
);

export const taxRecordsRelations = relations(taxRecords, ({ many}) =>({
  person: many(person),
}));

export default taxRecords;