import { pgTable, serial, varchar, index, timestamp, integer,date,text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import person from './person';

const legal = pgTable(
  'legal',
  {
    record_id: serial('record_id').primaryKey(),
    person_id: integer('person_id').references(() => person.id),
    caseNumber: varchar('case_number', { length: 255 }).notNull(),
    caseType: varchar('case_type', { length: 255 }).notNull(),
    caseStatus: varchar('case_status', { length: 255 }).notNull(),
    filingDate: date('filing_date'),
    resolutioDate: date('resolution_date'),
    details:text ('details'),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      legalIdIdx: index('legal_id_idx').on(table.record_id),
      legalPersonIdx: index('legal_person_idx').on(table.person_id)
    };
  },
);

export const legalRelations = relations(legal, ({ many}) =>({
  person: many(person),
}));

export default legal;