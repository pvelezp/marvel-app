import Image from 'next/image'
import SearchIcon from '../../public/icons/search-icon.svg'
import styles from './styles.module.scss'
import { ChangeEventHandler } from 'react'

const TextField = ({
  value,
  placeholder,
  onChange,
}: {
  value: string
  placeholder: string
  onChange: ChangeEventHandler<HTMLInputElement>
}) => {
  return (
    <div className={styles.search}>
      <Image width={12} src={SearchIcon} alt="search-icon" />

      <input
        className={styles.searchInput}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextField
