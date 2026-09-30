import { create } from 'zustand'
import blogService from '../services/blogs'

export const useBlogStore = create((set) => ({
  blogs: [],

  initialize: async () => {
    const blogs = await blogService.getAll()
    set({ blogs })
  },

  createBlog: async (newBlog) => {
    const created = await blogService.create(newBlog)
    set((state) => ({ blogs: state.blogs.concat(created) }))
    return created
  },

  likeBlog: async (blog) => {
    const updated = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null
    })
    set((state) => ({
      blogs: state.blogs.map((b) => (b.id === updated.id ? { ...updated, user: blog.user } : b))
    }))
    return updated
  },

  removeBlog: async (id) => {
    await blogService.remove(id)
    set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }))
  }
}))
