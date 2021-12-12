import connection from '../database';

interface Student {
  student: string;
  studentClass: number;
}
async function addNewStudent({
  student,
  studentClass,
}: Student): Promise<number> {
  const result = await connection.query(
    `
    INSERT INTO users (student, class_id)
    VALUES ($1, $2)
    RETURNING id
    `,
    [student, studentClass],
  );
  return result.rows[0].id;
}

export { addNewStudent };
