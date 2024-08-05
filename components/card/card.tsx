import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFavoriteContext } from '../../context/favorite-provider'
import useAccessibility from '../../hooks/use-accesibility'
import { Character } from '../../types/character'
import Heart from '../heart/heart'
import styles from './card.module.scss'

interface CardProps {
  character: Character
}

const Card = ({ character }: CardProps) => {
  const router = useRouter()
  const { favorites, setFavorites } = useFavoriteContext()

  return (
    <article
      key={character.id}
      {...useAccessibility(() => {
        router.push(`/character/${character.id}`)
      }, 'character-card')()}
      className={styles.card}
    >
      <Image
        className={styles.cardImg}
        height={172}
        width={189}
        src={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
        alt={`image-of-${character.name}`}
      />{' '}
      <div className={styles.cardInfo}>
        <div className={styles.cardInfoName}>
          <h2>{character.name}</h2>
        </div>

        <div
          {...useAccessibility(e => {
            e.stopPropagation()
          }, 'favorite-button')()}
        >
          <Heart
            toggleFavorite={() => {
              setFavorites(character)
            }}
            isFavorite={favorites.has(character.id.toString())}
          />
        </div>
      </div>
    </article>
  )
}

export default Card
