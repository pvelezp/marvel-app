import '@testing-library/jest-dom'
import { render, screen } from '../../utils/test-utils'
import TextField from './text-field'

// Mock Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt} />,
}))

describe('textField component', () => {
  it('renders correctly with placeholder and input value', () => {
    const { container } = render(
      <TextField value="test" placeholder="Search..." onChange={() => {}} />
    )

    // Check if the placeholder is rendered correctly
    const inputElement = screen.getByPlaceholderText('Search...')
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveValue('test')

    // Check if the search icon is rendered
    expect(screen.getByAltText('search-icon')).toBeInTheDocument()

    // Check if the component container renders
    expect(container.firstChild).toHaveClass('search')
  })
})
