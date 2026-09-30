import { render, screen, fireEvent, waitFor } from '@testing-library/react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { View, Pressable, Text } from 'react-native'

import FormikTextInput from '../components/FormikTextInput'

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

describe('SignIn form', () => {
  it('calls onSubmit with the correct values', async () => {
    const onSubmit = jest.fn()

    render(
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" />
            <Pressable onPress={handleSubmit}>
              <Text>submit</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    )

    fireEvent.changeText(screen.getByPlaceholderText('Username'), 'testuser')
    fireEvent.changeText(screen.getByPlaceholderText('Password'), 'testpass')
    fireEvent.press(screen.getByText('submit'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { username: 'testuser', password: 'testpass' },
        expect.anything()
      )
    })
  })
})
