import connection from '../database';
import ParamError from '../error/ParamError';

interface Student {
  student: string;
  studentClass: number;
  token?: string;
}
interface Session {
  id: number;
  token: string;
}

async function insertSessionById({ id, token }: Session) {
  const result = await connection.query(
    `
    INSERT INTO sessions (token, user_id)
    VALUES ($1, $2)
    RETURNING *;
  `,
    [token, id],
  );
  if (!result) {
    throw new ParamError('Could not insert user');
  }
}

async function addNewStudent({
  student,
  studentClass,
  token,
}: Student): Promise<number> {
  const classes = await connection.query('SELECT id FROM classes;');
  if (!classes.rows.some((row) => row.id === studentClass)) {
    throw new ParamError('Could not insert');
  }
  const result = await connection.query(
    `
    INSERT INTO users (student, class_id)
    VALUES ($1, $2)
    RETURNING id
    `,
    [student, studentClass],
  );
  if (token) {
    await insertSessionById({ id: result.rows[0].id, token });
  }

  return result?.rows[0].id;
}
async function getUserIdBySession(token: string) {
  const result = await connection.query(
    `
    SELECT user_id as "userId" FROM sessions WHERE token = $1
  `,
    [token],
  );

  if (result.rowCount === 0) {
    return null;
  }
  return result.rows[0].userId;
}

export { addNewStudent, getUserIdBySession };
