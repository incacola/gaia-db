import { Table, getTableName, sql } from 'drizzle-orm';
import env from '@/env';
import { db, connection } from '@/db';
import * as schema from '@/db/schema';
import * as seeds from './seeds';

if (!env.DB_SEEDING) {
  throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: db, table: Table) {
  return db.execute(
    sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`),
  );
}

async function seedDatabase() {
  //for (const table of [schema.taxRecords]) {
    // await db.delete(table); // clear tables without truncating / resetting ids
    //await resetTable(db, table);
  //}

  //await seeds.person(db);
  //await seeds.address(db);
  //await seeds.tax(db);
  //await seeds.health(db);
  //await seeds.legal(db);
  await seeds.identification(db);

  await connection.end();
}

seedDatabase().catch((err) => {
  console.error(err);
  process.exit(1);
});
