import dayjs from 'dayjs';
import connection from '../database';
import Question from '../interfaces/Question';
import QuestionError from '../error/QuestionError';
import * as studentRepository from './studentRepository';
import * as tagsRepository from './tagsRepository';
import Answer from '../interfaces/Answer';

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

async function selectQuestionById(id: string) {
  const result = await connection.query(
    `SELECT
     questions.question, users.student, classes.class,
     questions.answered, questions.submit_at as "submitAt", tags.tag_name as "tagName",
     answers.answered_by as "answeredBy", answers.answered_at as "answeredAt"
     FROM questions
     JOIN users ON questions.user_id = users.id
     JOIN classes ON users.class_id = classes.id
     JOIN question_tags ON questions.id = question_tags.question_id
     JOIN tags ON question_tags.tag_id = tags.id
     LEFT JOIN answers ON questions.id = answers.question_id
     WHERE questions.id = $1;`,
    [id],
  );
  if (result.rowCount === 0) {
    throw new QuestionError('not found');
  }
  const mainInfos = result.rows[0];
  let questionInfos: Answer = {
    question: mainInfos.question,
    student: mainInfos.student,
    class: mainInfos.class,
    tags: result.rows.map((item) => item.tagName),
    answered: mainInfos.answered,
    submitAt: mainInfos.submitAt,
  };
  if (questionInfos.answered) {
    questionInfos = {
      ...questionInfos,
      answeredBy: mainInfos.answeredBy,
      answeredAt: mainInfos.answeredAt,
      answer: mainInfos.answer,
    };
  }
  return questionInfos;
}

async function getNoAnsweredQuestionsOnDb() {
  const noAnsweredQuestions = await connection.query(`
    SELECT questions.id, questions.question, users.student, classes.class, questions.submit_at as "submitAt"
    FROM questions
    JOIN users ON questions.user_id = users.id
    JOIN classes ON users.class_id = classes.id
    WHERE questions.answered = false;
  `);
  return noAnsweredQuestions.rows;
}

export { insertNewQuestion, selectQuestionById, getNoAnsweredQuestionsOnDb };
