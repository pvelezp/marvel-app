import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import axios from '../api/axios-instance'
import list from '../characters'
import Card from '../components/card/card'
import Loader from '../components/loader/loader'
import TextField from '../components/text-field/text-field'
import { useFavoriteContext } from '../context/favorite-provider'
import useFetchCharacters from '../hooks/use-fetch-characters'
import { Character } from '../types/character'
import styles from './index.module.scss'

const Home: NextPage<{ initialCharacters: Character[] }> = ({ initialCharacters }) => {
  const [searchText, setSearchText] = useState<string>('')
  const { showFavorites, favorites } = useFavoriteContext()
  const { characters, isLoading } = useFetchCharacters(searchText, initialCharacters)

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className={styles.characters}>
      {showFavorites && <p className={styles.charactersFavoriteTitle}> Favorites</p>}

      <TextField
        placeholder="Search a character..."
        value={searchText}
        onChange={e => {
          setSearchText(e.target.value)
        }}
      />

      <p className={styles.charactersResults}>
        {showFavorites ? favorites.size : characters.length} RESULT
        {favorites.size === 1 || characters.length === 1 ? '' : 'S'}
      </p>

      <div className={styles.charactersList}>
        {(showFavorites ? Array.from(favorites.values()) : characters).map(character => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get('', {
      timeout: 2000, // This is implemented only because Marvel's api is considerably slow and if the request
      params: {
        //time passes 2000 and fail, it would default to a local list of characters to assure initial visualization
        limit: 50,
      },
    })

    const initialCharacters = response?.data?.data?.results || []
    return {
      props: {
        initialCharacters,
      },
    }
  } catch (error) {
    return {
      props: {
        initialCharacters: list, // local list to assure initial visualization
      },
    }
  }
}

export default Home
