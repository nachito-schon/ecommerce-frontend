import { Product } from './types'

export const getProductList = async () => {
  const response = await fetch(
    'https://f24mkjbvyqbpgvxlzus2sjisjy0oozje.lambda-url.sa-east-1.on.aws/products',
    { mode: 'cors' }
  )
  const fetchedData = await response.json()
  return fetchedData as Product[]
}

export const attemptLogin = async (user: string, password: string) => {
  try {
    const response = await fetch(
      'https://f24mkjbvyqbpgvxlzus2sjisjy0oozje.lambda-url.sa-east-1.on.aws/user/login',
      {
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ user: user, password: password }),
      }
    )
    const fetchedData = await response.json()
    const token = fetchedData.token
    if (!token) {
      throw new Error('Authentication failed.')
    }

    return token
  } catch (error) {
    throw error
  }
}

export const editProduct = async (product: Product) => {
  try {
    const response = await fetch(
      `https://f24mkjbvyqbpgvxlzus2sjisjy0oozje.lambda-url.sa-east-1.on.aws/products/${product._id}/update`,
      {
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(product),
      }
    )

    if (!(response.status === 200)) {
      throw new Error('Authentication failed.')
    }

    return
  } catch (error) {
    throw error
  }
}
