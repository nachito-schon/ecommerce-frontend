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
    <div className="w-screen h-screen">
      <Carousel itemList={productList} />
    </div>
  )
}

export default App
