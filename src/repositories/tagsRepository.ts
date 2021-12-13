import connection from '../database';
import ConflictError from '../error/ConflictError';

interface Tags {
  id: number;
  tagName: string;
}
interface QuestionTags {
  id: number;
  tags: number[];
}

async function getAllTags(): Promise<Tags[]> {
  const result = await connection.query(
    'SELECT id, tag_name as "tagName" FROM tags;',
  );
  return result.rows;
}

async function insertNewTag(tag: string): Promise<number> {
  const tagList = await getAllTags();
  if (tagList.some((item) => item.tagName === tag)) {
    throw new ConflictError('Tag already exists');
  }
  const result = await connection.query(
    `
  INSERT INTO tags
   tag_name
   VALUES ($1)
   RETURNING id`,
    [tag],
  );
  return result.rows[0].id;
}

async function insertQuestionTags({ id, tags }: QuestionTags) {
  tags.forEach(async (item) => {
    await connection.query(
      `
    INSERT INTO question_tags (tag_id, question_id)
    VALUES ($1, $2);
    `,
      [item, id],
    );
  });
}

export { getAllTags, insertNewTag, insertQuestionTags };
