import * as answerRepository from '../repositories/answerRepository';
import BodyError from '../error/BodyError';
import PostAnswer from '../interfaces/PostAnswer';

async function postAnswer({ id, answer, token }: PostAnswer) {
  if (answer.length < 3) {
    throw new BodyError('Answer size must be at least 3 characters');
  }
  const insertAnswer = await answerRepository.insertNewAnswer({
    id,
    answer,
    token,
  });
  if (!insertAnswer) {
    throw new Error('Error inserting answer');
  }
}

export { postAnswer };
