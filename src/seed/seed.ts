import { createConnection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

async function executeSqlFile(filePath: string, connection: any) {
  const query = fs.readFileSync(filePath, { encoding: 'utf-8' });
  await connection.query(query);
}

async function seed() {
  const connection = await createConnection();
  const setvalSuperhero =
    "SELECT setval('superhero.superhero_id_seq', (SELECT MAX(id) FROM superhero.superhero))";
  const setvalPower =
    "SELECT setval('superhero.superpower_id_seq', (SELECT MAX(id) FROM superhero.superpower))";
  try {
    const sqlPath = path.join(__dirname, 'queries');

    const file = fs.readdirSync(sqlPath);

    await executeSqlFile(
      path.join(sqlPath, 'query-reference-data.sql'),
      connection,
    );
    await executeSqlFile(
      path.join(sqlPath, 'query-hero-power.sql'),
      connection,
    );
    await executeSqlFile(
      path.join(sqlPath, 'query-hero-attribute.sql'),
      connection,
    );
    await connection.query(setvalSuperhero);
    await connection.query(setvalPower);

    console.log('All SQL files have been executed!');
  } catch (error) {
    console.error('Error seeding data: ', error);
  } finally {
    await connection.close();
  }
}

seed().catch(console.error);
