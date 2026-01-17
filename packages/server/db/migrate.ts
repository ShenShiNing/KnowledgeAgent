import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';

async function runMigration() {
  console.log('Running migrations...');

  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL!,
  });

  const db = drizzle(connection);

  await migrate(db, { migrationsFolder: './drizzle/migrations' });

  console.log('Migrations completed successfully!');

  await connection.end();
  process.exit(0);
}

runMigration().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
