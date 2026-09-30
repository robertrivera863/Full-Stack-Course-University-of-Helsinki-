const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token = null

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Root', passwordHash })
  const savedUser = await user.save()

  const blogObjects = initialBlogs.map(blog => new Blog({ ...blog, user: savedUser._id }))
  const savedBlogs = await Promise.all(blogObjects.map(blog => blog.save()))

  savedUser.blogs = savedBlogs.map(blog => blog._id)
  await savedUser.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })

  token = loginResponse.body.token
})

// ---------- 4.8 ----------

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

// ---------- 4.9 ----------

test('the unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
    expect(blog._id).toBeUndefined()
  })
})

// ---------- 4.10 ----------

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).toContain('Canonical string reduction')
})

// ---------- 4.11 ----------

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Likes default test',
    author: 'Tester',
    url: 'http://example.com'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)

  expect(response.body.likes).toBe(0)
})

// ---------- 4.12 ----------

test('blog without title returns 400', async () => {
  const newBlog = {
    author: 'No Title',
    url: 'http://example.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

test('blog without url returns 400', async () => {
  const newBlog = {
    title: 'No URL',
    author: 'No URL',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)
})

// ---------- 4.13 ----------

test('a blog can be deleted by its creator', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await Blog.find({})
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

  const titles = blogsAtEnd.map(blog => blog.title)
  expect(titles).not.toContain(blogToDelete.title)
})

// ---------- 4.14 ----------

test('a blog can be updated', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToUpdate = blogsAtStart[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send({ likes: 100 })
    .expect(200)

  expect(response.body.likes).toBe(100)
})

// ---------- 4.23 ----------

test('adding a blog fails with 401 if no token is provided', async () => {
  const newBlog = {
    title: 'No token blog',
    author: 'Nobody',
    url: 'http://example.com',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

test('adding a blog succeeds with a valid token', async () => {
  const newBlog = {
    title: 'Valid token blog',
    author: 'Root',
    url: 'http://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
})

test('deleting a blog fails with 401 if no token is provided', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)
})

test('deleting a blog by a non-creator fails with 403', async () => {
  const blogsAtStart = await Blog.find({})
  const blogToDelete = blogsAtStart[0]

  const otherPasswordHash = await bcrypt.hash('otherpass', 10)
  const otherUser = new User({ username: 'other', name: 'Other', passwordHash: otherPasswordHash })
  await otherUser.save()

  const otherLogin = await api
    .post('/api/login')
    .send({ username: 'other', password: 'otherpass' })

  const otherToken = otherLogin.body.token

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${otherToken}`)
    .expect(403)
})

// ---------- 4.16 ----------

describe('user creation', () => {
  test('fails if username is missing', async () => {
    const newUser = { name: 'No Username', password: 'validpass' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toBeDefined()
  })

  test('fails if password is missing', async () => {
    const newUser = { username: 'nopassword', name: 'No Password' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails if username is shorter than 3 characters', async () => {
    const newUser = { username: 'ab', name: 'Short', password: 'validpass' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails if password is shorter than 3 characters', async () => {
    const newUser = { username: 'validname', name: 'Short', password: 'ab' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('fails if username is not unique', async () => {
    const newUser = { username: 'root', name: 'Duplicate', password: 'validpass' }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    expect(response.body.error).toContain('unique')
  })

  test('succeeds with valid data', async () => {
    const newUser = { username: 'newuser', name: 'New User', password: 'validpass' }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
