import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Product } from '../lib/types'
import { ProductEditView } from './ProductEditView'

type Props = {
  item: Product | null
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  isLoggedIn: boolean
}

export const ProductView = ({ item, isOpen, setIsOpen, isLoggedIn }: Props) => {
  const [isProductEditViewOpen, setIsProductEditViewOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto cursor-pointer">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md xl:max-w-2xl flex flex-col xl:flex-row xl:gap-4 transform overflow-hidden rounded-2xl bg-zinc-800 p-6 text-white text-left align-middle shadow-xl transition-all cursor-default">
                <div className="h-[220px] xl:h-[350px] xl:w-[350px] flex items-center bg-zinc-700 xl:flex-1">
                  <img
                    src={item?.image_url}
                    alt={item?.name}
                    className="max-h-full max-w-full m-auto"
                  />
                </div>
                <div className="mt-3 xl:mt-0 flex flex-col justify-between xl:flex-1">
                  <div>
                    <h3 className="text-2xl xl:text-3xl">{item?.name}</h3>
                    <h2 className="text-3xl xl:text-4xl text-lime-300">{`$${item?.price}`}</h2>
                    <p className="xl:text-lg my-3">{item?.description}</p>
                    {isLoggedIn ? (
                      <button
                        className="bg-zinc-700 font-medium px-3 py-1.5 rounded outline-none"
                        onClick={() => setIsProductEditViewOpen(true)}
                      >
                        EDIT
                      </button>
                    ) : null}
                  </div>
                  <button
                    className="self-end bg-zinc-700 font-medium px-3 py-1.5 rounded outline-none"
                    onClick={closeModal}
                  >
                    CLOSE
                  </button>
                </div>
                <ProductEditView
                  isOpen={isProductEditViewOpen}
                  setIsOpen={setIsProductEditViewOpen}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
