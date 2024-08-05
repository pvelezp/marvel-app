import Image from 'next/image'
import React from 'react'
import FullHeart from '../../public/icons/heartfull.svg'
import EmptyHeart from '../../public/icons/heartempty.svg'

const Heart = ({
  isFavorite,
  toggleFavorite,
  size = 'small',
}: {
  isFavorite: boolean
  toggleFavorite: () => void
  size?: 'small' | 'large'
}) => {
  const dimension = size === 'small' ? 12 : 24
  return (
    <div
      onClick={() => {
        toggleFavorite()
      }}
    >
      {isFavorite ? (
        <Image width={dimension} height={dimension} src={FullHeart} alt="full-heart" />
      ) : (
        <Image width={dimension} height={dimension} src={EmptyHeart} alt="empty-heart" />
      )}
    </div>
  )
}

export default Heart
