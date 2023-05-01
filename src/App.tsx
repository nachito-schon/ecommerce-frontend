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
    <div className="w-screen h-screen flex flex-col items-stretch bg-zinc-900">
      <div className="w-full py-2 xl:py-3 bg-zinc-800 text-center text-white text-3xl xl:text-4xl">
        <h1 className="select-none">Virtual Shop</h1>
      </div>
      <Carousel itemList={productList} />
    </div>
  )
}

export default App
