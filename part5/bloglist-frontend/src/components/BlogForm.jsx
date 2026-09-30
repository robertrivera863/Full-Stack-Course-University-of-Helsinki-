import { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Label, Button } from '../styled/components'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Label>
        Title
        <Input
          value={title}
          placeholder="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Label>
      <Label>
        Author
        <Input
          value={author}
          placeholder="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Label>
      <Label>
        URL
        <Input
          value={url}
          placeholder="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Label>
      <Button type="submit">Create</Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
