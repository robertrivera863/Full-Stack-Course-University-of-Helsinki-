import { render, screen } from '@testing-library/react-native'

import RepositoryItem from '../components/RepositoryItem'

describe('RepositoryItem', () => {
  it('renders repository information correctly', () => {
    const repository = {
      id: '1',
      fullName: 'jaredpalmer/formik',
      description: 'Build forms in React',
      language: 'TypeScript',
      forksCount: 2000,
      stargazersCount: 33000,
      ratingAverage: 87,
      reviewCount: 100,
      ownerAvatarUrl: 'https://example.com/avatar.png'
    }

    render(<RepositoryItem repository={repository} />)

    expect(screen.getByText('jaredpalmer/formik')).toBeDefined()
    expect(screen.getByText('Build forms in React')).toBeDefined()
    expect(screen.getByText('TypeScript')).toBeDefined()
    expect(screen.getByText('2.0k')).toBeDefined()
    expect(screen.getByText('33.0k')).toBeDefined()
    expect(screen.getByText('87')).toBeDefined()
    expect(screen.getByText('100')).toBeDefined()
  })
})
