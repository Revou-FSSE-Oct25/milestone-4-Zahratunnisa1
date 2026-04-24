import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('Transaction (e2e)', () => {
  jest.setTimeout(30000);
  let app: INestApplication;
  let token: string;
  let accountId: string;

  const user = {
    name: 'Zahra Test',
    email: 'zahra@test.com',
    password: '123456',
  };


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    // 🔥 REGISTER
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(user);

    // 🔥 LOGIN
    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: user.email,
        password: user.password,
      });

    token = loginRes.body.access_token;

    // 🔥 CREATE ACCOUNT
    const accRes = await request(app.getHttpServer())
      .post('/accounts')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    accountId = accRes.body.id;
  });

  // ✅ 1. DEPOSIT SUCCESS
  it('should deposit successfully', async () => {
    await request(app.getHttpServer())
      .post('/transactions/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 1000,
      })
      .expect(201);
  });

  // ✅ 2. WITHDRAW SUCCESS
  it('should withdraw successfully', async () => {
    await request(app.getHttpServer())
      .post('/transactions/withdraw')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 500,
      })
      .expect(201);
  });

  // ❌ 3. SALDO TIDAK CUKUP
  it('should fail if insufficient balance', async () => {
    await request(app.getHttpServer())
      .post('/transactions/withdraw')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId,
        amount: 9999999,
      })
      .expect(400);
  });

  // ❌ 4. TANPA TOKEN
  it('should fail if no token', async () => {
    await request(app.getHttpServer())
      .post('/transactions/deposit')
      .send({
        accountId,
        amount: 100,
      })
      .expect(401);
  });

  // ❌ 5. ACCOUNT TIDAK DITEMUKAN
  it('should fail if account not found', async () => {
    await request(app.getHttpServer())
      .post('/transactions/deposit')
      .set('Authorization', `Bearer ${token}`)
      .send({
        accountId: 'random-id',
        amount: 100,
      })
      .expect(400);
  });

  afterAll(async () => {
    await app.close();
  });
});
