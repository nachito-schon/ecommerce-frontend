import { Product } from './types'

export const getProductList = async () => {
  const response = await fetch(
    'https://f24mkjbvyqbpgvxlzus2sjisjy0oozje.lambda-url.sa-east-1.on.aws/products',
    { mode: 'cors' }
  )
  const fetchedData = await response.json()
  return fetchedData as Product[]
}
