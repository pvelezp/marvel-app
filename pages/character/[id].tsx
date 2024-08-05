import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useMemo } from 'react'
import axios from '../../api/axios-instance'
import Heart from '../../components/heart/heart'
import Loader from '../../components/loader/loader'
import { useFavoriteContext } from '../../context/favorite-provider'
import useAccessibility from '../../hooks/use-accesibility'
import { Character, Comic } from '../../types/character'
import extractYear from '../../utils/extract-year'
import styles from './styles.module.scss'

interface CharacterType {
  character: Character
  characterComics: Comic[]
  error: any
}

const filterValidComics = (comics: Comic[]) => {
  return comics.filter(
    comic => comic.thumbnail !== null && !comic.thumbnail.path.includes('image_not_available')
  )
}

const orderByYear = (array: Comic[]): Comic[] => {
  return array.sort((a, b) => extractYear(a.title).year - extractYear(b.title).year)
}

const CharacterDetail = ({ character, characterComics, error }: CharacterType) => {
  const { favorites, setFavorites } = useFavoriteContext()

  const filteredComics = useMemo(() => filterValidComics(characterComics), [characterComics])

  const accessibilityProps = useAccessibility(e => {
    e.stopPropagation()
  }, 'character-detail-favorite-button')()

  if (error) {
    return <div>There is been an error: {error}</div>
  }

  if (!character || !characterComics) {
    return <Loader />
  }

  return (
    <div>
      <Head>
        <title>Marvel Character Detail</title>
      </Head>

      <section className={styles.detailBanner}>
        <Image
          className={styles.detailBannerImage}
          height={320}
          width={320}
          src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
          alt="detail-character-banner"
        />

        <div className={styles.detailBannerInfo}>
          <div className={styles.detailBannerInfoTitle}>
            <h4>{character.name}</h4>

            <div className={styles.detailBannerInfoHeart} {...accessibilityProps}>
              <Heart
                size="large"
                isFavorite={favorites.has(character.id.toString())}
                toggleFavorite={() => {
                  setFavorites(character)
                }}
              />
            </div>
          </div>
          <h6>{character.description}</h6>
        </div>
      </section>

      <section className={styles.detailComics}>
        <div className={styles.detailComicsTitle}>
          <h4>COMICS</h4>
        </div>

        <div className={styles.detailComicsList}>
          {orderByYear(filteredComics).map(comic => (
            <article key={comic.id} className={styles.detailComic}>
              <Image
                height={268}
                width={180}
                src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <p className={styles.detailComicTitle}> {extractYear(comic.title).title} </p>
              <p className={styles.detailComicYear}> {extractYear(comic.title).year} </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.query

  try {
    const [characterResponse, comicsResponse] = await Promise.all([
      axios.get(`/${id}`),
      axios.get(`/${id}/comics`),
    ])

    return {
      props: {
        character: characterResponse.data.data.results[0],
        characterComics: comicsResponse.data.data.results,
        error: null,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)

    return {
      props: {
        character: null,
        characterComics: null,
        error: 'Failed to fetch data.',
      },
    }
  }
}

export default CharacterDetail
