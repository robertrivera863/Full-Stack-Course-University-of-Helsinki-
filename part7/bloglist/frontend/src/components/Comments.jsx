import { useState } from 'react'
import blogService from '../services/blogs'

const Comments = ({ blog }) => {
  const [content, setContent] = useState('')
  const [comments, setComments] = useState(blog.comments || [])

  const addComment = async (event) => {
    event.preventDefault()
    const newComment = await blogService.addComment(blog.id, content)
    setComments(comments.concat(newComment))
    setContent('')
  }

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <input
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
