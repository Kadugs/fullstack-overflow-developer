/* eslint-disable no-undef */
import '../../setup';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../src/app';
import connection from '../../src/database';

describe('test question post', () => {
  beforeAll(async () => {
    await connection.query(`
    DELETE FROM question_tags;
    DELETE FROM questions;
    DELETE FROM users;
    `);
  });
  it('should return 400 for invalid params', async () => {
    const body = {};
    const result = await supertest(app).post('/questions').send(body);
    expect(result.status).toBe(400);
  });
  it('should return 201 for valid params', async () => {
    const body = {
      question: faker.random.words(),
      student: faker.name.findName(),
      studentClass: 1,
      tags: [1, 2],
    };
    const result = await supertest(app).post('/questions').send(body);
    expect(result.status).toBe(201);
  });

  afterAll(() => {
    connection.end();
  });
});
