import { pgTable, serial, varchar, index, timestamp, integer,date,text } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import person from './person';

const healthRecords = pgTable(
  'healthRecords',
  {
    health_id: serial('health_id').primaryKey(),
    person_id: integer('person_id').references(() => person.id),
    healthRecordType: varchar('health_record_type', { length: 255 }).notNull(),
    description:text ('description'),
    recordioDate: date('record_date'),
    createdAt: timestamp("created_at", { mode: "string" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).notNull().defaultNow(),
  },
  (table) => {
    return {
      healthRecordsIdIdx: index('healthRecords_id_idx').on(table.health_id),
      healthRecordsPersonIdx: index('healthRecords_person_idx').on(table.person_id)
    };
  },
);

export const healthRecordsRelations = relations(healthRecords, ({ many}) =>({
  person: many(person),
}));

export default healthRecords;