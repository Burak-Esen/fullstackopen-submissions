const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'How to Draw a Line with CSS',
    category: 'css',
    url: 'https://css-tricks.com/video-screencasts/195-how-to-draw-a-line-with-css/',
    author: 'Chris Coyier',
    likes: 5
  },
  {
    title:'React patterns',
    author:'Michael Chan',
    url:'https://reactpatterns.com/',
    likes: 7
  }
]

const blogsInDbNow = async () => {
  return await Blog.find({})
}

module.exports = {
  blogsInDbNow,
  initialBlogs
}