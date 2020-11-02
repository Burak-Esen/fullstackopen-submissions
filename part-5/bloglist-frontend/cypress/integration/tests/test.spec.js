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

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
  })
})