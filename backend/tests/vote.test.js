// tests/vote.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server
const Voter = require('../models/Voter');
const { generateHash } = require('../utils/cryptoUtils');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Seed a voter for testing
  await Voter.create({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: generateHash('password123'),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Vote API', () => {
  let token;

  beforeAll(async () => {
    // Login to get token for voting
    const res = await request(app)
      .post('/api/voters/login')
      .send({
        email: 'jane@example.com',
        password: 'password123',
      });
    token = res.body.token;
  });

  // Test vote submission
  it('should submit a vote', async () => {
    const res = await request(app)
      .post('/api/voters/vote')
      .set('x-auth-token', token)
      .send({ candidateId: 1 }); // Example candidate ID
    expect(res.statusCode).toEqual(200);
    expect(res.body.msg).toBe('Vote submitted');
  });

  // Test vote submission by the same voter
  it('should not allow multiple votes', async () => {
    const res = await request(app)
      .post('/api/voters/vote')
      .set('x-auth-token', token)
      .send({ candidateId: 1 }); // Example candidate ID
    expect(res.statusCode).toEqual(500);
    expect(res.body.msg).toBe('Vote submission failed');
  });
});
