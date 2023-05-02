import { ItemStatus, Product } from '../lib/types'

type Props = {
  item: Product
  status: ItemStatus
  handleClick: () => void
}

export const ProductCard = ({ item, status, handleClick }: Props) => {
  const classes = `absolute w-[220px] xl:w-[350px] text-center m-auto flex flex-col justify-center bg-zinc-800 rounded overflow-hidden cursor-pointer select-none ${status}`

  return (
    <div className={classes} onClick={handleClick}>
      <div className="h-[220px] xl:h-[350px] flex items-center m-auto overflow-hidden">
        <img
          src={item.image_url}
          alt={item.name}
          className="min-w-full min-h-full object-cover"
        />
      </div>
      <div className="h-[120px] p-4 flex flex-col justify-between">
        <h3 className="text-2xl xl:text-3xl truncate">{item.name}</h3>
        <h2 className="text-3xl xl:text-4xl text-lime-300 truncate">{`$${item.price}`}</h2>
      </div>
    </div>
  )
}
