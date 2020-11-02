Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBloglistAppUser', JSON.stringify(body))
    console.log(JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})
Cypress.Commands.add('createUser', ({ username, password }) => {
  cy.request({
    url: 'http://localhost:3001/api/users',
    method: 'POST',
    body: { username, password }
  })

  cy.visit('http://localhost:3000')
})
Cypress.Commands.add('createBlog', ({ title, author, likes, url }) => {
  cy.request({
    url:'http://localhost:3001/api/blogs',
    method:'POST',
    body:{ title, author, likes, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistAppUser')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', () => {
    cy.contains('username')
    cy.contains('password')
  })


  describe('when existing a user', () => {
    beforeEach(() => {
      cy.createUser({ username:'root', password:'root' })
    })

    it('the user can log in', () => {
      cy.get('input[name=Username]').type('root')
      cy.get('input[name=Password]').type('root')
      cy.get('button#login').click()
      cy.contains('(root) logged-in')
    })

    it('and login fails with wrong password', () => {
      cy.get('input[name=Username]').type('root')
      cy.get('input[name=Password]').type('toor')
      cy.get('button#login').click()
      cy.contains('Wrong credentials')
      cy.contains('Wrong credentials')
        .should('have.css', 'color', 'rgb(110, 0, 0)')
    })
  })


  describe('when logged in', () => {
    beforeEach(() => {
      cy.createUser({ username:'root', password:'root' })
      cy.login({ username:'root', password:'root' })
    })

    it('A blog can be created', () => {
      cy.contains('New Blog').click()
      cy.get('input#title').type('ReDos')
      cy.get('input#author').type('wikipedia')
      cy.get('input#url').type('https://en.wikipedia.org/wiki/ReDoS')
      cy.contains('Add Blog').click()
      cy.contains('ReDos', { timeout: 10000 })
      cy.contains('wikipedia')
    })

    it('user can like a blog', () => {
      cy.contains('New Blog').click()
      cy.get('input#title').type('ReDos')
      cy.get('input#author').type('wikipedia')
      cy.get('input#url').type('https://en.wikipedia.org/wiki/ReDoS')
      cy.contains('Add Blog').click()
      cy.get('h3.blogTitle', { timeout: 10000 }).click()
      cy.contains('Like').click()
      cy.contains('likes:', { timeout: 15000 }).should('contain', 'likes: 1')
      cy.contains('Like').click()
      cy.contains('likes:', { timeout: 15000 }).should('contain', 'likes: 2')
    })

    it('user can delete a blog', () => {
      cy.contains('New Blog').click()
      cy.get('input#title').type('ReDos')
      cy.get('input#author').type('wikipedia')
      cy.get('input#url').type('https://en.wikipedia.org/wiki/ReDoS')
      cy.contains('Add Blog').click()
      cy.get('h3.blogTitle', { timeout: 10000 }).click()
      cy.contains('Delete?').click()
      cy.get('.column').should('not.contain', 'ReDos')
    })

    it('user can\'t delete another\'s blog', () => {
      cy.contains('New Blog').click()
      cy.get('input#title').type('ReDos')
      cy.get('input#author').type('wikipedia')
      cy.get('input#url').type('https://en.wikipedia.org/wiki/ReDoS')
      cy.contains('Add Blog').click()
      cy.get('#logout').click()
      cy.createUser({ username:'anotherUser', password:'pass' })
      cy.wait(5000)
      cy.login({ username:'anotherUser', password:'pass' })
      cy.contains('ReDos', { timeout: 15000 })
      cy.get('h3.blogTitle').click()
      cy.contains('Delete?').click()
      cy.contains('Unauthorized activity')
    })

    it('and sort by likes button works properly', () => {
      cy.createBlog({
        title:'ReDos-0',
        author:'wikipedia',
        likes:0,
        url:'https://en.wikipedia.org/wiki/ReDoS'
      })
      cy.createBlog({
        title:'ReDos-5',
        author:'wikipedia',
        likes:5,
        url:'https://en.wikipedia.org/wiki/ReDoS'
      })
      cy.createBlog({
        title:'ReDos-9',
        author:'wikipedia',
        likes:9,
        url:'https://en.wikipedia.org/wiki/ReDoS'
      })
      cy.createBlog({
        title:'ReDos-11',
        author:'wikipedia',
        likes:11,
        url:'https://en.wikipedia.org/wiki/ReDoS'
      })
      cy.get('h3.blogTitle', { timeout: 10000 }).then(detailButtons => {
        cy.wrap(detailButtons[0]).click()
        cy.wrap(detailButtons[1]).click()
        cy.wrap(detailButtons[2]).click()
        cy.wrap(detailButtons[3]).click()
      })
      cy.contains('Sort by likes').click()
      cy.get('.likesSpan').then((LikesSpan) => {
        cy.wrap(LikesSpan[0]).contains('likes: 11')
        cy.wrap(LikesSpan[1]).contains('likes: 9')
        cy.wrap(LikesSpan[2]).contains('likes: 5')
        cy.wrap(LikesSpan[3]).contains('likes: 0')
      })
    })
  })

})