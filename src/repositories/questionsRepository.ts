import dayjs from 'dayjs';
import connection from '../database';
import Question from '../interfaces/Question';
import * as studentRepository from './studentRepository';
import * as tagsRepository from './tagsRepository';

async function insertNewQuestion({
  question,
  student,
  studentClass,
  tags,
}: Question) {
  const studentId = await studentRepository.addNewStudent({
    student,
    studentClass,
  });
  const now = dayjs().format('DD-MM-YYYY');
  const rowQuestionId = await connection.query(
    `INSERT INTO questions (question, user_id, submit_at) 
      VALUES ($1, $2, $3)
      RETURNING id
      `,
    [question, studentId, now],
  );
  await tagsRepository.insertQuestionTags({
    id: rowQuestionId.rows[0].id,
    tags,
  });
  return rowQuestionId.rows[0].id;
}

export { insertNewQuestion };
