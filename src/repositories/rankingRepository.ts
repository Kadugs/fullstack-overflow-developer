import connection from '../database';

async function getTopTenRanking() {
  const result = await connection.query(`
        SELECT student, answers FROM users 
        ORDER BY answers DESC
        LIMIT 10
    `);
  return result.rows;
}

export { getTopTenRanking };
