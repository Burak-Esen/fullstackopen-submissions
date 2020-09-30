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

const mostBlogs = blogs => {
  let blogCounterArray = []
  let listOfAuthors = []
  blogs.forEach(blog => {
    if(listOfAuthors.includes(blog.author)){
      blogCounterArray[listOfAuthors.indexOf(blog.author)]+=1
    }else{
      listOfAuthors.push(blog.author)
      blogCounterArray.push(1)
    }
  })
  console.log(blogCounterArray)
  console.log(listOfAuthors)
  let indexOfMaxCount = blogCounterArray.indexOf(blogCounterArray.concat().sort((a,b) => b-a)[0])
  return {
    author: listOfAuthors[indexOfMaxCount],
    blogs: blogCounterArray[indexOfMaxCount]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}