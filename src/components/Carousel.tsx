import { useState } from 'react'
import { ItemStatus, Product } from '../lib/types'
import { ProductCard } from './ProductCard'

type Props = {
  itemList: Product[] | null[]
}

export const Carousel = ({ itemList }: Props) => {
  const [currentItem, setCurrentItem] = useState(0)
  const [moving, setMoving] = useState<'backwards' | 'forwards'>('forwards')

  const showPreviousItem = () => {
    setCurrentItem((previousIndex) => {
      return previousIndex === 0 ? itemList.length - 1 : previousIndex - 1
    })
    setMoving('backwards')
  }

  const showNextItem = () => {
    setCurrentItem((previousIndex) => {
      return previousIndex === itemList.length - 1 ? 0 : previousIndex + 1
    })
    setMoving('forwards')
  }

  const openProductView = () => {}

  const getItemStatus = (index: number): ItemStatus => {
    if (index === currentItem && moving === 'forwards') {
      return 'active-from-next'
    }

    if (index === currentItem && moving === 'backwards') {
      return 'active-from-previous'
    }

    if (
      moving === 'forwards' &&
      (index === currentItem - 1 ||
        (index === itemList.length - 1 && currentItem === 0))
    ) {
      return 'swipe-left'
    }

    if (
      moving === 'backwards' &&
      (index === currentItem + 1 ||
        (index === 0 && currentItem === itemList.length - 1))
    ) {
      return 'swipe-right'
    }

    return 'inactive'
  }

  return (
    <div className="flex grow text-white">
      <button
        className="material-symbols-outlined text-zinc-700 text-5xl grow"
        onClick={showPreviousItem}
      >
        arrow_left
      </button>
      <div className="w-[220px] h-[340px] relative flex justify-center items-center">
        {itemList.map((item, index) =>
          item ? (
            <ProductCard
              key={index}
              status={getItemStatus(index)}
              item={item}
              handleClick={openProductView}
            />
          ) : (
            <span
              key={index}
              className="material-symbols-outlined m-auto text-zinc-500 text-6xl animate-spin"
            >
              refresh
            </span>
          )
        )}
      </div>
      <button
        className="material-symbols-outlined text-zinc-700 text-5xl grow"
        onClick={showNextItem}
      >
        arrow_right
      </button>
    </div>
  )
}
