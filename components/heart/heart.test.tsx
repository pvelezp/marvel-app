import { fireEvent, render, screen } from 'test-utils'
import Heart from './heart'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} />
  },
}))

describe('heart component', () => {
  it('renders full heart icon when isFavorite is true', () => {
    render(<Heart isFavorite={true} toggleFavorite={() => {}} />)

    const fullHeartIcon = screen.getByAltText('full-heart')
    expect(fullHeartIcon).toBeInTheDocument()
  })

  it('renders empty heart icon when isFavorite is false', () => {
    render(<Heart isFavorite={false} toggleFavorite={() => {}} />)

    const emptyHeartIcon = screen.getByAltText('empty-heart')
    expect(emptyHeartIcon).toBeInTheDocument()
  })

  it('calls toggleFavorite when clicked', () => {
    const toggleFavoriteMock = jest.fn()
    render(<Heart isFavorite={false} toggleFavorite={toggleFavoriteMock} />)

    const emptyHeartIcon = screen.getByAltText('empty-heart')
    fireEvent.click(emptyHeartIcon)

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1)
  })
})
