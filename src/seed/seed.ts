import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

async function executeSqlFile(filePath: string, connection: DataSource) {
  const query = fs.readFileSync(filePath, { encoding: 'utf-8' });
  await connection.query(query);
}

async function seed() {
  const connection = await new DataSource({
    type: 'postgres',
    host: process.env.TYPEORM_HOST || 'localhost',
    port: process.env.TYPEORM_PORT ? parseInt(process.env.TYPEORM_PORT) : 5432,
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'postgres',
    database: process.env.TYPEORM_DATABASE || 'superhero',
  }).initialize();

  const setvalSuperhero =
    "SELECT setval('superhero.superhero_id_seq', (SELECT MAX(id) FROM superhero.superhero))";
  const setvalPower =
    "SELECT setval('superhero.superpower_id_seq', (SELECT MAX(id) FROM superhero.superpower))";
  const setvalAttribute =
    "SELECT setval('superhero.attribute_id_seq', (SELECT MAX(id) FROM superhero.attribute))";
  
    try {
    const sqlPath = path.join(__dirname, 'queries');

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
    await connection.query(setvalAttribute);

    console.log('All SQL files have been executed!');
  } catch (error) {
    console.error('Error seeding data: ', error);
  } finally {
    await connection.destroy();
  }
}

seed().catch(console.error);
