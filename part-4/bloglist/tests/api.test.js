const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')
const Blog = require('../models/blog')
//npm test -- tests/api.test.js

beforeEach(async () => {
  await Blog.deleteMany({})
  for(let blog of helper.initialBlogs){
    const blogObj = new Blog(blog)
    await blogObj.save()
  }
})

test('Blogs returned as a json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('is property is exist', async () => {
  const blogs = await helper.blogsInDbNow()
  expect(blogs[0].id).toBeDefined()
  expect(blogs[1].id).toBeDefined()
})

afterAll(() => mongoose.connection.close())
