const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
require('express-async-errors')
const User = require('../models/user')
const linkPreviewGenerator = require('link-preview-generator')

const checkToken = (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id) {
    response.status(401).json({ error:'token missing or invalid' })
  }
  return decodedToken
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (request, response) => {
  const decodedToken = checkToken(request, response)
  const user = await User.findById(decodedToken.id)
  let blogs=user.blogs.map(blog => blog.toString())
  if(!blogs.includes(request.params.id)) {
    response.status(403).json({ error:'Unauthorized attempt or blog is deleted' })
  }
  const blog = await Blog.findById(request.params.id).populate('user')
  if(blog){
    response.json(blog.toJSON())
  }else{
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = checkToken(request, response)
  const user = await User.findById(decodedToken.id)
  const previewData = await linkPreviewGenerator(body.url)
  const newBlog = new Blog({
    title:body.title,
    author: body.author,
    likes: body.likes,
    url: body.url,
    previewUrl:previewData.img,
    category: body.category,
    user:user._id
  })
  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = checkToken(request, response)
  const user = await User.findById(decodedToken.id)
  let blogs=user.blogs.map(blog => blog.toString())
  if(!blogs.includes(request.params.id)) {
    return response.status(403).json({ error:'Unauthorized attempt or the blog already deleted' })
  }else{
    const index = blogs.indexOf(request.params.id)
    blogs.splice(index, 1)
  }
  await Blog.findByIdAndRemove(request.params.id)
  user.blogs=blogs
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const decodedToken = checkToken(request, response)
  const user = await User.findById(decodedToken.id)
  let blogs=user.blogs.map(blog => blog.toString())
  if(!blogs.includes(request.params.id)) {
    response.status(403).json({ error:'Unauthorized attempt or the blog already deleted' })
  }
  const previewData = await linkPreviewGenerator(request.body.url)
  const blog = {
    title:request.body.title,
    url:request.body.url,
    previewUrl:previewData.img,
    author:request.body.author,
    likes:request.body.likes,
    category: request.body.category
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
