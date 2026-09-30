const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// 4.15 + 4.16 — create a new user
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  // 4.16 — validate in the controller, NOT with Mongoose
  if (!username || !password) {
    return response.status(400).json({
      error: 'username and password are required'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

// 4.15 — list all users (with blogs populated for 4.17)
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1
  })
  response.json(users)
})

module.exports = usersRouter
