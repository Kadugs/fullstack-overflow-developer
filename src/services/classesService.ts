import * as classesRepository from '../repositories/classesRepository';
import BodyError from '../error/BodyError';

async function postClass(newClass: string) {
  if (newClass.length < 2) {
    throw new BodyError('invalid class');
  }
  const id = await classesRepository.insertNewClass(newClass);
  return id;
}
async function getClasses() {
  const classList = await classesRepository.getAllClasses();
  return classList;
}

export { postClass, getClasses };
