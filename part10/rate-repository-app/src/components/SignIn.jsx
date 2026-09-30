import { Formik } from 'formik'
import * as yup from 'yup'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FormikTextInput from './FormikTextInput'
import { useSignIn } from '../hooks'
import theme from '../theme'

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigation = useNavigation()

  const onSubmit = async (values) => {
    try {
      await signIn(values)
      navigation.navigate('RepositoryList')
    } catch (e) {
      console.log('Sign in failed', e)
    }
  }

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="username" placeholder="Username" />
          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.link}>Create an account</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
    flex: 1
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600'
  },
  link: {
    color: theme.colors.primary,
    textAlign: 'center',
    marginTop: 15
  }
})

export default SignIn
