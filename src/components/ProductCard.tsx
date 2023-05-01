import { ItemStatus, Product } from '../lib/types'

type Props = {
  item: Product
  status: ItemStatus
  handleClick: () => void
}

export const ProductCard = ({ item, status, handleClick }: Props) => {
  const classes = `absolute w-[220px] text-center m-auto flex flex-col justify-center bg-zinc-800 cursor-pointer select-none ${status}`

  return (
    <div className={classes} onClick={handleClick}>
      <div className="h-[220px] flex items-center m-auto">
        <img
          src={item.image_url}
          alt={item.name}
          className="max-h-full max-w-full"
        />
      </div>
      <div className="h-[120px] p-4 flex flex-col justify-between">
        <h3 className="text-2xl truncate">{item.name}</h3>
        <h2 className="text-3xl text-lime-300 truncate">{`$${item.price}`}</h2>
      </div>
    </div>
  )
}
