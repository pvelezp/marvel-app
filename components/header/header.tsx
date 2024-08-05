import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFavoriteContext } from '../../context/favorite-provider'
import useAccessibility from '../../hooks/use-accesibility'
import FullHeart from '../../public/icons/heartfull.svg'
import MarvelLogo from '../../public/logo/marvel-logo.svg'
import styles from './header.module.scss'

const Header = () => {
  const { favorites, setShowFavorites } = useFavoriteContext()
  const router = useRouter()

  return (
    <header className={styles.header}>
      <div
        {...useAccessibility(() => {
          setShowFavorites(false)
          router.push('/')
        }, 'marvel-logo')()}
      >
        <Image height={44} src={MarvelLogo} alt="marvel-logo" />
      </div>

      <div
        className={styles.headerFavorites}
        {...useAccessibility(() => {
          setShowFavorites(true)
        }, 'header-favorites-button')()}
      >
        <Image width={24} src={FullHeart} alt="full-heart" />
        <p>{favorites.size}</p>
      </div>
    </header>
  )
}

export default Header
