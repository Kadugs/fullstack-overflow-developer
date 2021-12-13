/* eslint-disable no-undef */
import '../../setup';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../src/app';
import connection from '../../src/database';
import * as questionFactory from '../factories/questionFactory';
import * as studentFactory from '../factories/studentFactory';

beforeAll(async () => {
  await connection.query(`
  DELETE FROM sessions;
  DELETE FROM question_tags;
  DELETE FROM questions;
  DELETE FROM users;
  `);
});
describe('question post', () => {
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
});

describe('get question by id', () => {
  let id: string = '';
  beforeAll(async () => {
    id = await questionFactory.createQuestion();
  });
  it('should returns 400 for invalid param', async () => {
    const result = await supertest(app).get(
      `/questions/${faker.random.word()}`,
    );
    expect(result.status).toBe(400);
  });
  it('should returns 404 for not founded id', async () => {
    const result = await supertest(app).get('/questions/0');
    expect(result.status).toBe(404);
  });
  it('should return 200 for success', async () => {
    const result = await supertest(app).get(`/questions/${id}`);
    expect(result.status).toBe(200);
  });
});

describe('post answer', () => {
  it('should return 400 for invalid params', async () => {
    const result = await supertest(app).post(
      `/questions/${faker.datatype.number()}`,
    );
    expect(result.status).toBe(400);
  });
  it('should return 403 for no authorization', async () => {
    const body = {
      answer: faker.random.words(),
    };
    const result = await supertest(app)
      .post(`/questions/${faker.datatype.number()}`)
      .send(body);
    expect(result.status).toBe(403);
  });
  it('should return 401 for invalid authorization', async () => {
    const body = {
      answer: faker.random.words(),
    };
    const result = await supertest(app)
      .post(`/questions/${faker.datatype.number()}`)
      .send(body)
      .set('Authorization', `Bearer ${faker.datatype.uuid()}`);
    expect(result.status).toBe(401);
  });
  it('should return 404 for invalid question', async () => {
    const token: string = await studentFactory.createToken();
    const body = {
      answer: faker.random.words(),
    };
    const result = await supertest(app)
      .post(`/questions/${faker.datatype.number()}`)
      .send(body)
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toBe(404);
  });
});

afterAll(() => {
  connection.end();
});
