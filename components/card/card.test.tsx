import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useFavoriteContext } from '../../context/favorite-provider'
import { Character } from '../../types/character'
import Card from './card'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../context/favorite-provider', () => ({
  useFavoriteContext: jest.fn(),
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseFavoriteContext = useFavoriteContext as jest.Mock

describe('card component', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Spider-Man',
    thumbnail: { path: 'https://example.com/spiderman', extension: 'jpg' },
  }

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    })

    mockUseFavoriteContext.mockReturnValue({
      favorites: new Map<string, Character>(),
      setFavorites: jest.fn(),
    })
  })

  it('renders the card with character details', () => {
    render(<Card character={mockCharacter} />)

    expect(screen.getByAltText(`image-of-${mockCharacter.name}`)).toBeInTheDocument()
    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument()
  })
})
