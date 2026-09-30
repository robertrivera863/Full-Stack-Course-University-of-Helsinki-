import { useQuery, useMutation, useApolloClient } from '@apollo/client'
import {
  GET_REPOSITORIES,
  GET_REPOSITORY,
  SIGN_IN,
  SIGN_UP,
  CREATE_REVIEW,
  DELETE_REVIEW,
  GET_ME
} from '../graphql/queries'
import { setAccessToken } from '../utils/authStorage'

export const useRepositories = (variables) => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repositories.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables
      }
    })
  }

  return {
    repositories: data?.repositories,
    loading,
    refetch,
    fetchMore: handleFetchMore
  }
}

export const useRepository = (id, first = 5) => {
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first },
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        id,
        first,
        after: data.repository.reviews.pageInfo.endCursor
      }
    })
  }

  return {
    repository: data?.repository,
    loading,
    fetchMore: handleFetchMore
  }
}

export const useSignIn = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(SIGN_IN)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username, password } })
    await setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
    return data
  }

  return [signIn, result]
}

export const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP)
  const signUp = async ({ username, password }) => {
    return mutate({ variables: { username, password } })
  }
  return [signUp, result]
}

export const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)
  const createReview = async (review) => {
    return mutate({ variables: review })
  }
  return [createReview, result]
}

export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)
  const deleteReview = async (id) => {
    return mutate({ variables: { id } })
  }
  return [deleteReview, result]
}

export const useMe = (variables) => {
  const { data, loading, refetch, fetchMore } = useQuery(GET_ME, {
    variables,
    fetchPolicy: 'cache-and-network'
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }
    fetchMore({
      variables: {
        ...variables,
        after: data.me.reviews.pageInfo.endCursor
      }
    })
  }

  return { me: data?.me, loading, refetch, fetchMore: handleFetchMore }
}
