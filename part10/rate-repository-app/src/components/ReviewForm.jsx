import { Formik } from 'formik'
import * as yup from 'yup'
import { View, Text, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import FormikTextInput from './FormikTextInput'
import { useCreateReview } from '../hooks'
import theme from '../theme'

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100')
    .required('Rating is required')
})

const ReviewForm = () => {
  const [createReview] = useCreateReview()
  const navigation = useNavigation()

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values
    const { data } = await createReview({
      repositoryName,
      ownerName,
      rating: Number(rating),
      text
    })
    navigation.navigate('SingleRepository', {
      id: data.createReview.repositoryId
    })
  }

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name="ownerName" placeholder="Repository owner" />
          <FormikTextInput name="repositoryName" placeholder="Repository name" />
          <FormikTextInput name="rating" placeholder="Rating (0-100)" keyboardType="numeric" />
          <FormikTextInput name="text" placeholder="Review (optional)" multiline />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create review</Text>
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
  }
})

export default ReviewForm
