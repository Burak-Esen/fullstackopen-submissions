const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
//npm test -- tests/api.test.js
test('Blogs returned as a json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


afterAll(() => mongoose.connection.close())
