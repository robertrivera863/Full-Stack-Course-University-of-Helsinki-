import { FlatList, View, Text, Pressable, Linking, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { useRepository } from '../hooks'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'

const ReviewItem = ({ review }) => (
  <View style={styles.review}>
    <View style={styles.reviewHeader}>
      <Text style={styles.reviewRating}>{review.rating}</Text>
      <View style={styles.reviewBody}>
        <Text style={styles.reviewUser}>{review.user.username}</Text>
        <Text>{review.text}</Text>
      </View>
    </View>
  </View>
)

const SingleRepository = () => {
  const route = useRoute()
  const { id } = route.params
  const { repository, fetchMore } = useRepository(id)

  if (!repository) {
    return <Text style={styles.loading}>Loading...</Text>
  }

  const reviews = repository.reviews
    ? repository.reviews.edges.map((edge) => edge.node)
    : []

  const openGithub = () => {
    Linking.openURL(repository.url)
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <RepositoryItem repository={repository} showLink />
          <Pressable style={styles.button} onPress={openGithub}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </Pressable>
          <Text style={styles.reviewsTitle}>Reviews</Text>
        </>
      }
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
    />
  )
}

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    marginTop: 20
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '600'
  },
  reviewsTitle: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    marginLeft: 15,
    marginVertical: 10
  },
  review: {
    backgroundColor: theme.colors.white,
    padding: 15
  },
  reviewHeader: {
    flexDirection: 'row'
  },
  reviewRating: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    color: theme.colors.primary,
    textAlign: 'center',
    lineHeight: 36,
    fontWeight: 'bold',
    marginRight: 10
  },
  reviewBody: {
    flex: 1
  },
  reviewUser: {
    fontWeight: 'bold',
    marginBottom: 5
  },
  separator: {
    height: 8,
    backgroundColor: theme.colors.background
  }
})

export default SingleRepository
