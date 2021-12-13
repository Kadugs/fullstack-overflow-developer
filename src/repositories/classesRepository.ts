import connection from '../database';
import ConflictError from '../error/ConflictError';

interface Classes {
  id: number;
  class: string;
}

async function getAllClasses(): Promise<Classes[]> {
  const result = await connection.query('SELECT * FROM classes;');
  return result.rows;
}

async function insertNewClass(newClass: string): Promise<number> {
  const classList = await getAllClasses();
  if (classList.some((item) => item.class === newClass)) {
    throw new ConflictError('Class already exists');
  }
  const result = await connection.query(
    `
  INSERT INTO classes
   (class)
   VALUES ($1)
   RETURNING *;`,
    [newClass],
  );
  return result.rows[0].id;
}

export { getAllClasses, insertNewClass };
