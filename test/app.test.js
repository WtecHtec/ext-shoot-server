// app.test.js
const request = require('supertest');
const express = require('express');
const router = require('../src/routes');

const app = express();
app.use(express.json());
app.use(router);

describe('End-to-End Test', () => {
    test('GET /health should return status code 200', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
    });
});
