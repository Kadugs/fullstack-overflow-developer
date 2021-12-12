import connection from '../database';

interface Tags {
  id: number;
  tags: number[];
}

async function insertQuestionTags({ id, tags }: Tags) {
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

export { insertQuestionTags };
