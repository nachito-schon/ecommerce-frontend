import { useState } from 'react'
import { ItemStatus, Product } from '../lib/types'
import { ProductCard } from './ProductCard'
import { ProductView } from './ProductView'

type Props = {
  itemList: Product[] | null[]
  isLoggedIn: boolean
}

export const Carousel = ({ itemList, isLoggedIn }: Props) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0)
  const [moving, setMoving] = useState<'backwards' | 'forwards' | null>(null)
  const [isProductViewOpen, setIsProductViewOpen] = useState(false)

  const showPreviousItem = () => {
    setCurrentItemIndex((previousIndex) => {
      return previousIndex === 0 ? itemList.length - 1 : previousIndex - 1
    })
    setMoving('backwards')
  }

  const showNextItem = () => {
    setCurrentItemIndex((previousIndex) => {
      return previousIndex === itemList.length - 1 ? 0 : previousIndex + 1
    })
    setMoving('forwards')
  }

  const openProductView = () => {
    setIsProductViewOpen(true)
  }

  const getItemStatus = (index: number): ItemStatus => {
    if (index === currentItemIndex && !moving) {
      return 'active'
    }

    if (index === currentItemIndex && moving === 'forwards') {
      return 'active-from-next'
    }

    if (index === currentItemIndex && moving === 'backwards') {
      return 'active-from-previous'
    }

    if (
      moving === 'forwards' &&
      (index === currentItemIndex - 1 ||
        (index === itemList.length - 1 && currentItemIndex === 0))
    ) {
      return 'swipe-left'
    }

    if (
      moving === 'backwards' &&
      (index === currentItemIndex + 1 ||
        (index === 0 && currentItemIndex === itemList.length - 1))
    ) {
      return 'swipe-right'
    }

    return 'inactive'
  }

  return (
    <div className="flex items-center grow mx-6 xl:mx-9 text-white">
      <button
        className="material-symbols-outlined h-full text-zinc-700 text-5xl grow"
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
        className="material-symbols-outlined h-full text-zinc-700 text-5xl grow"
        onClick={showNextItem}
      >
        arrow_right
      </button>
      <ProductView
        item={itemList[currentItemIndex]}
        isOpen={isProductViewOpen}
        setIsOpen={setIsProductViewOpen}
        isLoggedIn={isLoggedIn}
      />
    </div>
  )
}
