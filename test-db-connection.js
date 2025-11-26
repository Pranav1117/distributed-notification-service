import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

console.log("Connecting to:", process.env.DATABASE_URL);

client.connect()
  .then(() => {
    console.log('Connected successfully');
    return client.end();
  })
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });
