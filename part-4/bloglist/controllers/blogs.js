const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  if(blog){
    response.json(blog.toJSON())
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const users = await User.find({})
  const newBlog = new Blog({
    title:body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    category: body.category,
    user:users[0].id
  })
  const savedBlog = await newBlog.save()
  response.json(savedBlog.toJSON())

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title:request.body.title,
    url:request.body.url,
    author:request.body.author,
    likes:request.body.likes,
    category: request.body.category
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
