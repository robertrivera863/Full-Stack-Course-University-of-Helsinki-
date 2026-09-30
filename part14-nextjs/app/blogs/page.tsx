const blogs = [
  { id: 1, title: 'React patterns', author: 'Michael Chan', likes: 7 },
  {
    id: 2,
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5
  },
  {
    id: 3,
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12
  }
]

export default function BlogsPage() {
  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} — {blog.author} ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}
