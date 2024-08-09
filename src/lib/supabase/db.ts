import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as dotenv from 'dotenv';
import * as schema from '../../../migrations/schema';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL)  {
  console.log('🔴 Cannot find Database URL')
}

const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(client, { schema });

const migrateDB = async () => {
  try {
    console.log('🟠 Migrating client...');
    await migrate(db, { migrationsFolder: 'migrations' });
    console.log('🟢 Successfully migrated! 🎉');
  } catch (error) {
    console.log('🔴 Error Migrating client');
  }
}

migrateDB();  // every time db is used, it is also going to call migrateDB()

export default db;