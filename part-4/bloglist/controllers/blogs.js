const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs.map(blog => blog.toJSON()))
    })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if(blog){
        response.json(blog.toJSON())
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const newBlog = new Blog({
    title:request.body.title,
    author: request.body.author,
    likes: request.body.likes,
    url: request.body.url,
    category: request.body.category
  })
  newBlog.save().then(savedBlog => {
    response.json(savedBlog.toJSON())
  })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const blog = {
    title:request.body.title,
    url:request.body.url,
    author:request.body.author,
    likes:request.body.likes,
    category: request.body.category
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    .then(updatedBlog => {
      response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))
})

module.exports = blogsRouter
