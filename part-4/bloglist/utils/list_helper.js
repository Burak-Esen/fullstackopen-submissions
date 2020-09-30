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

const favouriteBlog = blogs => {
  let listOfLikes = blogs.map(blog => blog.likes)
  let maxLikes = listOfLikes.concat().sort((a,b) => b-a )[0]
  let indexOfMaxLikes = listOfLikes.indexOf(maxLikes)
  const mostLikedBlog = blogs[indexOfMaxLikes]
  return {
    title:mostLikedBlog.title,
    author:mostLikedBlog.author,
    likes:mostLikedBlog.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}