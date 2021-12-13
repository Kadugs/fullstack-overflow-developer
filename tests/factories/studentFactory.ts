import faker from 'faker';
import { v4 as uuid } from 'uuid';
import connection from '../../src/database';

async function createStudent(): Promise<string> {
  const result = await connection.query(
    `
    INSERT INTO users (student, class_id)
    VALUES ($1, $2)
    RETURNING id
    `,
    [faker.name.findName(), 1],
  );
  return result.rows[0].id;
}

async function createToken(): Promise<string> {
  const token: string = uuid();
  const userId: string = await createStudent();
  const result = await connection.query(
    `
    INSERT INTO sessions (token, user_id)
    VALUES ($1, $2)
    RETURNING token;
  `,
    [token, userId],
  );
  return result.rows[0].token;
}

export { createStudent, createToken };
