import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
import Blog from './Blog'

const SingleBlog = ({ blogs, user, handleLike, handleDelete }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return <p>blog not found</p>
  }

  const canLike = Boolean(user)
  const canDelete = Boolean(
    user && blog.user && user.username === blog.user.username
  )

  return (
    <Blog
      blog={blog}
      handleLike={handleLike}
      handleDelete={handleDelete}
      canLike={canLike}
      canDelete={canDelete}
    />
  )
}

SingleBlog.propTypes = {
  blogs: PropTypes.array.isRequired,
  user: PropTypes.object,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default SingleBlog
