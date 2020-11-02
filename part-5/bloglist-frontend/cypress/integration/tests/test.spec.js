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
    // headers: {
    //   'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBloglistAppUser')).token}`
    // }
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
  })

})