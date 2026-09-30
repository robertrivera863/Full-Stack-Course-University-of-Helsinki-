import { useField } from '../hooks'
import { Form, Input, Button } from '../styled/components'

const BlogForm = ({ createBlog }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title.value,
      author: author.value,
      url: url.value
    })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <Form onSubmit={addBlog}>
      <Input {...title} placeholder="title" />
      <Input {...author} placeholder="author" />
      <Input {...url} placeholder="url" />
      <Button type="submit">Create</Button>
    </Form>
  )
}

export default BlogForm
