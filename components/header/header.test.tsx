import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'
import { useFavoriteContext } from '../../context/favorite-provider'
import Header from './header'

// Mock the next/router and context
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('../../context/favorite-provider', () => ({
  useFavoriteContext: jest.fn(),
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}))

describe('header component', () => {
  const mockPush = jest.fn()
  const mockSetShowFavorites = jest.fn()
  const mockFavorites = new Map([['1', {}]])

  beforeEach(() => {
    jest.clearAllMocks()
    useRouter.mockReturnValue({ push: mockPush })
    useFavoriteContext.mockReturnValue({
      favorites: mockFavorites,
      setShowFavorites: mockSetShowFavorites,
    })
  })

  it('renders Marvel logo and full heart image', () => {
    render(<Header />)

    // Check if Marvel logo is rendered
    expect(screen.getByAltText('marvel-logo')).toBeInTheDocument()

    // Check if full heart image is rendered
    expect(screen.getByAltText('full-heart')).toBeInTheDocument()

    // Check if favorites count is displayed
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('navigates to home and calls setShowFavorites with false when Marvel logo is clicked', () => {
    render(<Header />)

    // Click the Marvel logo
    fireEvent.click(screen.getByAltText('marvel-logo'))

    // Assert that router.push was called with '/'
    expect(mockPush).toHaveBeenCalledWith('/')

    // Assert that setShowFavorites was called with false
    expect(mockSetShowFavorites).toHaveBeenCalledWith(false)
  })

  it('calls setShowFavorites with true when heart image is clicked', () => {
    render(<Header />)

    // Click the heart icon
    fireEvent.click(screen.getByAltText('full-heart'))

    // Assert that setShowFavorites was called with true
    expect(mockSetShowFavorites).toHaveBeenCalledWith(true)
  })
})
