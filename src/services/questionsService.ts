import { validateNewQuestion } from '../validations/questionsServiceValidation';
import BodyError from '../error/BodyError';
import ParamError from '../error/ParamError';
import QuestionError from '../error/QuestionError';
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

async function getQuestion(id: string) {
  if (Number.isNaN(Number(id))) {
    throw new ParamError('invalid id');
  }
  const question = await questionsRepository.selectQuestionById(id);
  return question;
}

async function getNoAnsweredQuestions() {
  const noAnsweredQuestions =
    await questionsRepository.getNoAnsweredQuestionsOnDb();
  if (!noAnsweredQuestions) {
    throw new QuestionError('Questions not found');
  }
  return noAnsweredQuestions;
}

export { addNewQuestion, getQuestion, getNoAnsweredQuestions };
