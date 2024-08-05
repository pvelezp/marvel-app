import axios, { CancelTokenSource } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { Character } from '../types/character'
import useDebounce from './use-debounce'

const useFetchCharacters = (
  searchText: string,
  initialCharacters: Character[],
  delay: number = 1000
) => {
  const [characters, setCharacters] = useState<Character[]>(initialCharacters)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedSearchText = useDebounce(searchText, delay)

  useEffect(() => {
    if (!debouncedSearchText) {
      setCharacters(initialCharacters)
      return
    }

    const source: CancelTokenSource = axios.CancelToken.source()

    const fetchCharacters = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await axios.get('', {
          params: { nameStartsWith: debouncedSearchText },
          cancelToken: source.token,
        })

        setCharacters(response?.data?.data?.results || [])
      } catch (err) {
        if (axios.isCancel(err)) {
          // console.log('Request canceled:', err.message)
        } else {
          setError('Failed to fetch characters')
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()

    return () => {
      source.cancel('Operation canceled by the user.')
    }
  }, [debouncedSearchText, initialCharacters])

  const filteredCharacters = useMemo(() => {
    return characters.filter(
      character =>
        !character?.thumbnail?.path.includes('image_not_available') &&
        !character?.thumbnail?.extension.includes('gif')
    )
  }, [characters])

  return { characters: filteredCharacters, isLoading, error }
}

export default useFetchCharacters
