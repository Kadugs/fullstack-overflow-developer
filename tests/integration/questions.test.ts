/* eslint-disable no-undef */
import '../../setup';
import supertest from 'supertest';
import app from '../../src/app';

describe('test question post', () => {
  it('should return 400 for invalid params', async () => {
    const body = {};
    const result = await supertest(app).post('/questions').send(body);
    expect(result.status).toBe(400);
  });
});
