import { useState } from 'react'
import { Product } from '../lib/types'

type Props = {
  itemList: Product[] | null[]
}

export const Carousel = ({ itemList }: Props) => {
  const [itemIndex, setItemIndex] = useState(0)

  const showPreviousItem = () => {
    setItemIndex((previousIndex) => {
      return previousIndex === 0 ? itemList.length - 1 : previousIndex - 1
    })
  }

  const showNextItem = () => {
    setItemIndex((previousIndex) => {
      return previousIndex === itemList.length - 1 ? 0 : previousIndex + 1
    })
  }

  return (
    <div className="flex">
      <button
        className="material-symbols-outlined m-auto"
        onClick={showPreviousItem}
      >
        arrow_left
      </button>
      <div>
        {itemList[itemIndex] ? <h1>{itemList[itemIndex]?.name}</h1> : null}
      </div>
      <button
        className="material-symbols-outlined m-auto"
        onClick={showNextItem}
      >
        arrow_right
      </button>
    </div>
  )
}
