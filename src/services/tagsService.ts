import * as tagsRepository from '../repositories/tagsRepository';
import BodyError from '../error/BodyError';

async function postTag(tag: string) {
  if (tag.length < 2) {
    throw new BodyError('invalid tag');
  }
  const id = await tagsRepository.insertNewTag(tag);
  return id;
}
async function getTags() {
  const tagList = await tagsRepository.getAllTags();
  return tagList;
}

export { postTag, getTags };
