import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Character } from '../types/character'

export const FavoriteContext = createContext<
  | {
      favorites: Map<string, Character>
      setFavorites: (character: Character) => void
      showFavorites: boolean
      setShowFavorites: (bool: boolean) => void
    }
  | undefined
>(undefined)

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Map<string, Character>>(new Map())
  const [showFavorites, setShowFavorites] = useState(false)

  const handleSetFavorites = useCallback((character: Character) => {
    setFavorites(prevFavorites => {
      const newFavorites = new Map(prevFavorites)
      if (newFavorites.has(character.id.toString())) {
        newFavorites.delete(character.id.toString())
      } else {
        newFavorites.set(character.id.toString(), character)
      }
      return newFavorites
    })
  }, [])

  const contextValue = useMemo(
    () => ({
      favorites,
      setFavorites: handleSetFavorites,
      showFavorites,
      setShowFavorites,
    }),
    [favorites, handleSetFavorites, showFavorites]
  )

  return <FavoriteContext.Provider value={contextValue}>{children}</FavoriteContext.Provider>
}

export const useFavoriteContext = () => {
  const context = useContext(FavoriteContext)
  if (!context) {
    throw new Error('useFavoriteContext must be used within a FavoriteProvider')
  }
  return context
}
