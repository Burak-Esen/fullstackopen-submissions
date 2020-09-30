const listHelper = require('../utils/list_helper')

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
  },
  {
    id:'5f74642047a755759ce9044c',
    title:'Type wars',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes:2
  },
  {
    id:'5f7463f047a755759ce9044b',
    title:'TDD harms architecture',
    author:'Robert C. Martin',
    url:'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes:0
  }
]

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

  test('when list has only one blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(26)
  })
})

describe('favouriteblog tests:', () => {
  test('favourite blog ', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    console.log('******',result)
    expect(result).toStrictEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })
})