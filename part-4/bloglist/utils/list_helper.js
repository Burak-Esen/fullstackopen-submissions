const dummy = (blogs) => {
  blogs.length
  return 1
}

const totalLikes = blogs => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

module.exports = {
  dummy,
  totalLikes
}