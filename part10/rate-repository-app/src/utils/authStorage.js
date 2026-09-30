import AsyncStorage from '@react-native-async-storage/async-storage'

const KEY = 'accessToken'

export const getAccessToken = async () => {
  return AsyncStorage.getItem(KEY)
}

export const setAccessToken = async (token) => {
  await AsyncStorage.setItem(KEY, token)
}

export const removeAccessToken = async () => {
  await AsyncStorage.removeItem(KEY)
}
