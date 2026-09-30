import { useState, useEffect } from 'react'
import { FlatList, View, Text, TextInput, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useRepositories } from '../hooks'
import RepositoryItem from './RepositoryItem'
import theme from '../theme'

const orderOptions = [
  { label: 'Latest repositories', orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  { label: 'Highest rated', orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  { label: 'Lowest rated', orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
]

const RepositoryList = () => {
  const [orderIndex, setOrderIndex] = useState(0)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [debouncedKeyword, setDebouncedKeyword] = useState('')
  const navigation = useNavigation()

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(searchKeyword), 500)
    return () => clearTimeout(timer)
  }, [searchKeyword])

  const option = orderOptions[orderIndex]

  const { repositories, loading, fetchMore } = useRepositories({
    orderBy: option.orderBy,
    orderDirection: option.orderDirection,
    searchKeyword: debouncedKeyword,
    first: 8
  })

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : []

  const onEndReach = () => {
    fetchMore()
  }

  const cycleOrder = () => {
    setOrderIndex((orderIndex + 1) % orderOptions.length)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search repositories"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Pressable style={styles.orderButton} onPress={cycleOrder}>
        <Text style={styles.orderButtonText}>{option.label}</Text>
      </Pressable>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate('SingleRepository', { id: item.id })}
          >
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          loading ? <Text style={styles.empty}>Loading...</Text> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  input: {
    backgroundColor: theme.colors.white,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderColor: theme.colors.border,
    borderWidth: 1
  },
  orderButton: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  orderButtonText: {
    color: theme.colors.white,
    fontWeight: '600'
  },
  separator: {
    height: 8,
    backgroundColor: theme.colors.background
  },
  empty: {
    textAlign: 'center',
    marginTop: 20
  }
})

export default RepositoryList
