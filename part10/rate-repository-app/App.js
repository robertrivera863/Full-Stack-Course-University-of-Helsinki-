import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ApolloProvider } from '@apollo/client'
import { StatusBar } from 'expo-status-bar'

import apolloClient from './src/utils/apolloClient'
import AppBar from './src/components/AppBar'
import RepositoryList from './src/components/RepositoryList'
import SignIn from './src/components/SignIn'
import SingleRepository from './src/components/SingleRepository'
import ReviewForm from './src/components/ReviewForm'
import SignUp from './src/components/SignUp'
import MyReviews from './src/components/MyReviews'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => <AppBar />
          }}
        >
          <Stack.Screen name="RepositoryList" component={RepositoryList} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SingleRepository" component={SingleRepository} />
          <Stack.Screen name="ReviewForm" component={ReviewForm} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="MyReviews" component={MyReviews} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App
