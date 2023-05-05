import { useEffect, useState } from 'react'
import { Carousel } from './components/Carousel'
import { Product } from './lib/types'
import { getProductList } from './lib/fetchData'
import { AuthenticationPanel } from './components/AuthenticationPanel'

function App() {
  const [productList, setProductList] = useState<Product[] | null[]>([null])
  const [isAuthenticationOpen, setIsAuthenticationOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    getProductList().then((list: Product[]) => setProductList(list))
  }, [])

  return (
    <div className="w-screen h-screen flex flex-col items-stretch bg-zinc-900">
      <div className="w-full py-2 xl:py-3 bg-zinc-800 text-center">
        <h1 className="select-none text-white text-3xl xl:text-4xl">
          Virtual Shop
        </h1>
      </div>
      {isLoggedIn ? (
        <div className="select-none ml-auto mt-5 xl:mt-8 mr-5 xl:mr-14 py-1 xl:py-2 px-3 xl:px-5 border-2 rounded bg-zinc-300 text-black xl:text-2xl font-medium text-white">
          Logged in
        </div>
      ) : (
        <button
          className="ml-auto mt-5 xl:mt-8 mr-5 xl:mr-14 py-1 xl:py-2 px-3 xl:px-5 border-zinc-300 border-2 rounded bg-zinc-800 text-xl xl:text-2xl font-medium text-white"
          onClick={() => setIsAuthenticationOpen(true)}
        >
          LOG IN
        </button>
      )}
      <Carousel itemList={productList} />
      <AuthenticationPanel
        isOpen={isAuthenticationOpen}
        setIsOpen={setIsAuthenticationOpen}
      />
    </div>
  )
}

export default App
