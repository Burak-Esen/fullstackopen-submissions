const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog.toJSON())
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const newBlog = new Blog({
    title:request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url,
    category: request.body.category
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
