import faker from 'faker';
import connection from '../../src/database';

async function createStudent() {
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

export { createStudent };
