import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from '../styled/components'

const BlogCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  }
`

const BlogTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;

  a {
    color: #1a73e8;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

const BlogMeta = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
`

const BlogActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.75rem;
`

const LikeButton = styled(Button)`
  background: #34a853;

  &:hover {
    background: #2d8e47;
  }
`

const DeleteButton = styled(Button)`
  background: #ea4335;

  &:hover {
    background: #c5221f;
  }
`

const DetailRow = styled.p`
  margin: 0.25rem 0;
  color: #444;
  font-size: 0.95rem;
`

const Blog = ({ blog, handleLike, handleDelete, canLike, canDelete }) => {
  return (
    <BlogCard>
      <BlogTitle>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.title}
        </a>
      </BlogTitle>
      <BlogMeta>by {blog.author}</BlogMeta>

      <DetailRow>URL: {blog.url}</DetailRow>
      <DetailRow>Likes: {blog.likes}</DetailRow>
      <DetailRow>Added by: {blog.user ? blog.user.name : 'unknown'}</DetailRow>

      <BlogActions>
        {canLike && <LikeButton onClick={() => handleLike(blog)}>Like</LikeButton>}
        {canDelete && <DeleteButton onClick={() => handleDelete(blog)}>Delete</DeleteButton>}
      </BlogActions>
    </BlogCard>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func,
  handleDelete: PropTypes.func,
  canLike: PropTypes.bool,
  canDelete: PropTypes.bool
}

export default Blog
