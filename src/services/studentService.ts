import { v4 as uuid } from 'uuid';
import BodyError from '../error/BodyError';
import * as studentRepository from '../repositories/studentRepository';
import NewStudent from '../interfaces/NewStudent';

async function createNewStudent({
  name,
  studentClass,
}: NewStudent): Promise<string> {
  const token = uuid();
  if (name.length < 3 || studentClass < 0) {
    throw new BodyError('invalid parameters');
  }
  await studentRepository.addNewStudent({ student: name, studentClass, token });
  return token;
}

export { createNewStudent };
