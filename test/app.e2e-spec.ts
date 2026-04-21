import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET / should return Hello World', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200);
  });

  it('GET /transactions should return 401 if no token', () => {
    return request(app.getHttpServer())
      .get('/transactions')
      .expect(401);
  });

  it('POST /transactions/deposit should fail without token', () => {
    return request(app.getHttpServer())
      .post('/transactions/deposit')
      .send({
        accountId: '123',
        amount: 1000,
      })
      .expect(401);
  });

  // ✅ PINDAHKAN KE SINI
  it('POST /transactions/deposit should fail with invalid data', () => {
    return request(app.getHttpServer())
      .post('/transactions/deposit')
      .set('Authorization', 'Bearer invalidtoken')
      .send({
        accountId: 'abc',
        amount: -100,
      })
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});

