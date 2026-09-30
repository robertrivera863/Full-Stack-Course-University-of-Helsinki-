import { StyleSheet, TextInput, View, Text } from 'react-native'
import { useField } from 'formik'

import theme from '../theme'

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const showError = meta.touched && meta.error

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, showError && styles.inputError]}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    padding: 10,
    backgroundColor: theme.colors.white
  },
  inputError: {
    borderColor: theme.colors.error
  },
  errorText: {
    color: theme.colors.error,
    marginTop: 3
  }
})

export default FormikTextInput
