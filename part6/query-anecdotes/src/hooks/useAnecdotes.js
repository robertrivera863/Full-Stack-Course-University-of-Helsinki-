import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdoteService from '../services/anecdotes'

export const useAnecdotes = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false
  })

  const createMutation = useMutation({
    mutationFn: anecdoteService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const voteMutation = useMutation({
    mutationFn: anecdoteService.vote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  return {
    anecdotes: result.data ?? [],
    isLoading: result.isLoading,
    isError: result.isError,
    create: createMutation.mutate,
    vote: voteMutation.mutate
  }
}
