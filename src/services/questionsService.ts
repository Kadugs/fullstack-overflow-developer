import { validateNewQuestion } from '../validations/questionsServiceValidation';
import BodyError from '../error/BodyError';
import Question from '../interfaces/Question';
import * as questionsRepository from '../repositories/questionsRepository';

async function addNewQuestion({
  question,
  student,
  studentClass,
  tags,
}: Question) {
  const isNewQuestionValid: boolean = validateNewQuestion({
    question,
    student,
    studentClass,
    tags,
  });
  if (!isNewQuestionValid) {
    throw new BodyError('Dados inseridos inválidos!');
  }
  const id = await questionsRepository.insertNewQuestion({
    question,
    student,
    studentClass,
    tags,
  });
  if (!id) {
    throw new Error('Erro no banco');
  }
  return id;
}

export { addNewQuestion };
