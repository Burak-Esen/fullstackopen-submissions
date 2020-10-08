const usersRouter = require('express').Router()
require('express-async-errors')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

usersRouter.post("/", async (request, response) => {
  const body = request.body
  const saltRounds = 13
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username:body.username,
    name:body.name,
    passwordHash:passwordHash
  })
  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter