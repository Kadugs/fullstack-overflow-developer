import faker from 'faker';
import dayjs from 'dayjs';
import { createStudent } from './studentFactory';
import connection from '../../src/database';

async function createQuestion() {
  const now = dayjs().format('DD-MM-YYYY');
  const studentId = await createStudent();

  const rowQuestionId = await connection.query(
    `INSERT INTO questions (question, user_id, submit_at) 
      VALUES ($1, $2, $3)
      RETURNING id;
      `,
    [faker.random.words(), studentId, now],
  );
  await connection.query(
    `
    INSERT INTO question_tags (tag_id, question_id)
    VALUES ($1, $2);
    `,
    [1, rowQuestionId.rows[0].id],
  );
  return rowQuestionId.rows[0].id;
}

export { createQuestion };
