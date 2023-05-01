import { useEffect, useState } from 'react'
import { Carousel } from './components/Carousel'
import { Product } from './lib/types'
import { getProductList } from './lib/fetchData'

function App() {
  const [productList, setProductList] = useState<Product[] | null[]>([null])
  useEffect(() => {
    getProductList().then((list: Product[]) => setProductList(list))
  }, [])

  return (
    <div className="w-screen h-screen px-6 flex items-center bg-zinc-900">
      <div className="fixed top-0 left-0 w-full py-2 bg-zinc-800 text-center text-white text-3xl">
        <h1>Virtual Shop</h1>
      </div>
      <Carousel itemList={productList} />
    </div>
  )
}

export default App
