import pg from 'pg';

const { Pool } = pg;

const localConfig: object = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const databaseConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

const connection = new Pool(
  process.env.NODE_ENV !== 'production' ? localConfig : databaseConfig,
);

export default connection;
