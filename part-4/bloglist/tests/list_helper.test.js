const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('totalLikes tests:', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const listWithManyBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes:7,
      id:'5f74621247a755759ce90447'
    },
    {
      id:'5f74634447a755759ce90448',
      title:'Go To Statement Considered Harmful',
      author:'Edsger W. Dijkstra',
      url:'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider...',
      likes:5
    },
    { id: '5f74639447a755759ce90449',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12
    }
  ]

  test('when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(24)
  })
})