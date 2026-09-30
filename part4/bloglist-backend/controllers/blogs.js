const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

// 4.17 — list all blogs, populated with creator info
// 4.22 — still works without a token
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

// 4.17 + 4.19 + 4.22 — only a valid token holder can create a blog
blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, url, author, likes } = request.body

  // 4.19 — require a valid token / user
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = request.user

  const blog = new Blog({
    title,
    url,
    author,
    likes: likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  // 4.17 — add blog to the user's blogs array
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  // populate user before returning
  const populated = await savedBlog.populate('user', {
    username: 1,
    name: 1
  })

  response.status(201).json(populated)
})

// 4.21 + 4.22 — only the creator can delete
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  // 4.21 — compare blog.user to the token's user id
  if (blog.user.toString() !== request.user._id.toString()) {
    return response.status(403).json({ error: 'only the creator can delete this blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: 'query' }
  )

  if (updatedBlog) {
    response.json(updatedBlog)
  } else {
    response.status(404).end()
  }
})

module.exports = blogsRouter
