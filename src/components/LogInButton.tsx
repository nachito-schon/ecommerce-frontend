import { useState } from 'react'

type Props = {
  isLoggedIn: boolean
  handleLogIn: () => void
  handleLogOut: () => void
}

export const LogInButton = ({
  isLoggedIn,
  handleLogIn,
  handleLogOut,
}: Props) => {
  const [isHoveringForLoggedIn, setIsHoveringLoggedIn] = useState(false)

  const logOut = () => {
    localStorage.removeItem('token')
    handleLogOut()
  }

  return isLoggedIn ? (
    <button
      className="select-none ml-auto mt-5 xl:mt-8 mr-5 xl:mr-14 py-1 xl:py-2 px-3 xl:px-5 rounded bg-zinc-300 text-black text-xl xl:text-2xl font-medium outline-none"
      onMouseEnter={() => setIsHoveringLoggedIn(true)}
      onMouseLeave={() => setIsHoveringLoggedIn(false)}
      onMouseOut={() => setIsHoveringLoggedIn(false)}
      onClick={logOut}
    >
      {isHoveringForLoggedIn ? 'LOG OUT' : 'Logged in'}
    </button>
  ) : (
    <button
      className="ml-auto mt-5 xl:mt-8 mr-5 xl:mr-14 py-1 xl:py-2 px-3 xl:px-5 border-zinc-300 border-2 rounded bg-zinc-800 text-xl xl:text-2xl font-medium text-white outline-none"
      onClick={handleLogIn}
    >
      LOG IN
    </button>
  )
}
