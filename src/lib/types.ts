export type Product = {
  name: string
  description: string
  image_url: string
  price: number
}

export type ItemStatus =
  | 'active'
  | 'active-from-next'
  | 'active-from-previous'
  | 'swipe-left'
  | 'swipe-right'
  | 'inactive'
