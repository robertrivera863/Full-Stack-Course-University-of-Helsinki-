import { View, Text, Image, StyleSheet } from 'react-native'

import theme from '../theme'

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return String(count)
}

const Stat = ({ label, value }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
)

const RepositoryItem = ({ repository, showLink }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text style={styles.fullName}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <Text style={styles.language}>{repository.language}</Text>
        </View>
      </View>
      <View style={styles.stats}>
        <Stat label="Stars" value={formatCount(repository.stargazersCount)} />
        <Stat label="Forks" value={formatCount(repository.forksCount)} />
        <Stat label="Reviews" value={repository.reviewCount} />
        <Stat label="Rating" value={repository.ratingAverage} />
      </View>
      {showLink && (
        <Text style={styles.link}>{repository.url}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    padding: 15
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  info: {
    marginLeft: 10,
    flex: 1
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading
  },
  description: {
    color: theme.colors.textSecondary
  },
  language: {
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    marginTop: 5
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  stat: {
    alignItems: 'center'
  },
  statValue: {
    fontWeight: 'bold'
  },
  statLabel: {
    color: theme.colors.textSecondary
  },
  link: {
    color: theme.colors.primary,
    marginTop: 10
  }
})

export default RepositoryItem
