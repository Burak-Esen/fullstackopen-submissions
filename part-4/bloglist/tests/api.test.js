const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./api_test_helper')
const bcrypt = require('bcryptjs')
//const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//npm test -- tests/api.test.js
let token
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 13)
  const rawUser = { username: 'root', passwordHash: passwordHash }
  const user = new User(rawUser)
  const savedUser = await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({username: 'root', password:'sekret'})
  
  token = loginResponse.body.token

  let blogs=[]
  for(let blog of helper.initialBlogs){
    const blogObj = new Blog({...blog, user:savedUser._id})
    const savedBlog = await blogObj.save()
    blogs = blogs.concat(savedBlog._id)
  }
  savedUser.blogs=blogs
  await savedUser.save()
})

test('Blogs returned as a json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('id property is exist', async () => {
  const blogs = await helper.blogsInDbNow()
  expect(blogs[0].id).toBeDefined()
  expect(blogs[1].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title:'Go To Statement Considered Harmful',
    author:'Edsger W. Dijkstra',
    url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes:9
  }
  
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const blogsNow = await helper.blogsInDbNow()
  expect(blogsNow).toHaveLength(helper.initialBlogs.length + 1)
})

test('likes is 0 as a default value', async () => {
  const newBlog = {
    title:'Full Stack Developer\'s Roadmap',
    url:'https://dev.to/ender_minyard/full-stack-developer-s-roadmap-2k12',
    author:'ender minyard'
  }
  const savedBlogResponse = await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(savedBlogResponse.body.likes).toBe(0)
})

test('status 400 when creating unvalid blog', async () => {
  const unvalidBlog ={
    author:'me',
    likes:100
  }
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(unvalidBlog)
    .expect(400)
})

test('delete a blog', async () => {
  const blogsAtStart = await helper.blogsInDbNow()
  const blogToDelete = blogsAtStart[0]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', 'bearer ' + token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDbNow()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  expect(titles).not.toContain(blogToDelete.title)
})

test('udate likes property of a blog', async () => {
  const blogs = await helper.blogsInDbNow()
  let selectedBlog = blogs[0].toJSON()
  selectedBlog.likes = 999
  delete selectedBlog.__v
  delete selectedBlog._id
  delete selectedBlog.id
  await api
    .post('/api/blogs')
    .set('Authorization', 'bearer ' + token)
    .send(selectedBlog)
    .expect(200)
  const blogsAtEnd = await helper.blogsInDbNow()
  expect(blogsAtEnd.map(blog => blog.likes)).toContain(selectedBlog.likes)
})

test('status code 401 Unauthorized if a token is not provided', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', "asdasdsasdasd")
    .expect(401)
})

afterAll(() => mongoose.connection.close())
