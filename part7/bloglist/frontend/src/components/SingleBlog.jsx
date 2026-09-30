import { useParams } from 'react-router-dom'
import { useBlogStore } from '../stores/blogStore'
import { useUserStore } from '../stores/userStore'
import Comments from './Comments'

const SingleBlog = ({ handleLike, handleDelete }) => {
  const { id } = useParams()
  const blogs = useBlogStore((state) => state.blogs)
  const user = useUserStore((state) => state.user)

  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const canDelete = Boolean(
    user && blog.user && user.username === blog.user.username
  )

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        {blog.likes} likes
        {user && <button onClick={() => handleLike(blog)}>like</button>}
        {canDelete && <button onClick={() => handleDelete(blog)}>delete</button>}
      </div>
      <div>added by {blog.user ? blog.user.name : 'unknown'}</div>
      <Comments blog={blog} />
    </div>
  )
}

export default SingleBlog
