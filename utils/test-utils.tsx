import { RenderOptions, render as rtlRender } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { FavoriteProvider } from '../context/favorite-provider'

interface Props {
  children: ReactNode
}

const AllProviders = ({ children }: Props) => {
  return <FavoriteProvider>{children}</FavoriteProvider>
}

const render = (ui: React.ReactElement, options?: RenderOptions) => {
  return rtlRender(ui, { wrapper: AllProviders, ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'

// Override the render method
export { render }
