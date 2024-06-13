require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  user: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
});

async function createDatabaseAndSchema() {
  try {
    await client.connect();
    const dbName = process.env.TYPEORM_DATABASE;
    const dbCheckRes = await client.query(`SELECT 1 FROM pg_database WHERE datname='${dbName}'`);
    if (dbCheckRes.rowCount === 0) {
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database ${dbName} created.`);
    } else {
      console.log(`Database ${dbName} already exists.`);
    }

    const schemaName = 'superhero';
    const schemaCheckRes = await client.query(`SELECT schema_name FROM information_schema.schemata WHERE schema_name = '${schemaName}'`);
    if (schemaCheckRes.rowCount === 0) {
      await client.query(`CREATE SCHEMA "${schemaName}"`);
      console.log(`Schema ${schemaName} created.`);
    } else {
      console.log(`Schema ${schemaName} already exists.`);
    }
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

createDatabaseAndSchema();