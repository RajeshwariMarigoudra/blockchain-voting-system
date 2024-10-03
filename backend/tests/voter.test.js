// tests/voter.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Import your server
const Voter = require('../models/Voter');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Voter API', () => {
  // Test voter registration
  it('should register a new voter', async () => {
    const res = await request(app)
      .post('/api/voters/register')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  });

  // Test voter login
  it('should login an existing voter', async () => {
    const res = await request(app)
      .post('/api/voters/login')
      .send({
        email: 'john@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test login with invalid credentials
  it('should return 400 for invalid login', async () => {
    const res = await request(app)
      .post('/api/voters/login')
      .send({
        email: 'john@example.com',
        password: 'wrongpassword',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body.msg).toBe('Invalid credentials');
  });
});
