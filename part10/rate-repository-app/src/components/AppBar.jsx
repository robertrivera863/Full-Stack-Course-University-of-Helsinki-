import { ScrollView, Pressable, Text, StyleSheet, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useQuery, useApolloClient } from '@apollo/client'

import { GET_ME } from '../graphql/queries'
import { removeAccessToken } from '../utils/authStorage'
import theme from '../theme'

const AppBar = () => {
  const navigation = useNavigation()
  const apolloClient = useApolloClient()
  const { data } = useQuery(GET_ME)

  const signOut = async () => {
    await removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable onPress={() => navigation.navigate('RepositoryList')}>
          <Text style={styles.tab}>Repositories</Text>
        </Pressable>
        {data?.me ? (
          <>
            <Pressable onPress={() => navigation.navigate('MyReviews')}>
              <Text style={styles.tab}>My reviews</Text>
            </Pressable>
            <Pressable onPress={signOut}>
              <Text style={styles.tab}>Sign out</Text>
            </Pressable>
          </>
        ) : (
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.tab}>Sign in</Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    backgroundColor: theme.colors.primary,
    paddingBottom: 10
  },
  tab: {
    color: theme.colors.white,
    fontWeight: '600',
    paddingHorizontal: 15,
    fontSize: theme.fontSizes.subheading
  }
})

export default AppBar
