import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { attemptLogin } from '../lib/fetchData'

type Props = {
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  setIsLoggedIn: (arg: boolean) => void
}

export const AuthenticationPanel = ({
  isOpen,
  setIsOpen,
  setIsLoggedIn,
}: Props) => {
  const [message, setMessage] = useState('')
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    const form = new FormData(event.target as HTMLFormElement)
    const user = form.get('user') as string
    const password = form.get('password') as string
    if (!user || !password) {
      setMessage('Enter a valid user and password')
      return
    }
    attemptLogin(user, password).then(
      (token) => {
        setIsLoggedIn(true)
        setIsOpen(false)
        localStorage.setItem('token', JSON.stringify(token))
      },
      (error) => setMessage('Incorrect user/password')
    )
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
                <div className="flex flex-col gap-12 w-full pt-6 items-stretch text-center">
                  <form
                    className="flex flex-col gap-12 items-center"
                    onSubmit={handleSubmit}
                  >
                    <label className="flex flex-col gap-4 text-xl">
                      User:
                      <input
                        className="w-56 px-2 py-1 bg-zinc-200 text-black outline-none"
                        type="text"
                        name="user"
                      />
                    </label>
                    <label className="flex flex-col gap-4 text-xl">
                      Password:
                      <input
                        className="w-56 px-2 py-1 bg-zinc-200 text-black outline-none"
                        type="password"
                        name="password"
                      />
                    </label>
                    <button
                      className="m-auto px-3 py-1.5 border-zinc-300 border-2 rounded bg-zinc-800 font-medium text-xl text-white rounded"
                      type="submit"
                    >
                      Log-In
                    </button>
                    <p className="text-red-500">{message}</p>
                  </form>
                  <button
                    className="self-end bg-zinc-700 font-medium px-3 py-1.5 rounded"
                    onClick={closeModal}
                  >
                    CLOSE
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
