import dayjs from 'dayjs';
import AuthError from '../error/AuthError';
import ParamError from '../error/ParamError';
import connection from '../database';
import * as studentRepository from './studentRepository';
import PostAnswer from '../interfaces/PostAnswer';

async function insertNewAnswer({ id, answer, token }: PostAnswer) {
  const userId = await studentRepository.getUserIdBySession(token);
  if (!userId) {
    throw new AuthError('invalid token');
  }

  const now = dayjs().format('DD-MM-YYYY');
  const questions = await connection.query(
    'SELECT * FROM questions WHERE id = $1',
    [id],
  );
  if (questions.rowCount === 0) {
    throw new ParamError('question not found');
  }
  await connection.query(
    `
    UPDATE users SET answers = answers + 1 WHERE id = $1
  `,
    [userId],
  );
  const result = await connection.query(
    `
    INSERT INTO answers (question_id, answered_by, answered_at, answer)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `,
    [id, userId, now, answer],
  );
  await connection.query(
    `
    UPDATE questions
     SET answered = true
     WHERE id = $1`,
    [result.rows[0].id],
  );
  return result.rows[0];
}

export { insertNewAnswer };
