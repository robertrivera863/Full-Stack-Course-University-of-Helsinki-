import { FlatList, View, Text, Pressable, Alert, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useApolloClient } from '@apollo/client'

import { useMe, useDeleteReview } from '../hooks'
import theme from '../theme'

const MyReviews = () => {
  const { me, refetch, fetchMore } = useMe({ first: 10 })
  const [deleteReview] = useDeleteReview()
  const navigation = useNavigation()
  const apolloClient = useApolloClient()

  const reviews = me ? me.reviews.edges.map((edge) => edge.node) : []

  const confirmDelete = (review) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: async () => {
            await deleteReview(review.id)
            apolloClient.resetStore()
            refetch()
          }
        }
      ]
    )
  }

  const renderItem = ({ item }) => (
    <View style={styles.review}>
      <Text style={styles.repoName}>{item.repository.fullName}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
      <Text>{item.text}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={() =>
            navigation.navigate('SingleRepository', {
              id: item.repository.id
            })
          }
        >
          <Text style={styles.action}>View repository</Text>
        </Pressable>
        <Pressable onPress={() => confirmDelete(item)}>
          <Text style={[styles.action, styles.delete]}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  )

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  )
}

const styles = StyleSheet.create({
  review: {
    backgroundColor: theme.colors.white,
    padding: 15
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading
  },
  rating: {
    color: theme.colors.primary,
    marginVertical: 5
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  action: {
    color: theme.colors.primary,
    fontWeight: '600'
  },
  delete: {
    color: theme.colors.error
  },
  separator: {
    height: 8,
    backgroundColor: theme.colors.background
  }
})

export default MyReviews
