import React, { useRef, useState } from 'react'
import useOutsideClickAlerter from "./../hooks/useOutsideClickAlerter"

function NavBar({ user }) {
  const userSettingsRef = useRef();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useOutsideClickAlerter(() => {
    setIsUserMenuOpen(false)
  }, userSettingsRef)

  return (
    <div
      className={"sticky z-50 bg-[#0e141b] text-white border-b-[1px] mb-4 border-b-gray-800 h-16 w-full"}
    >
      {/* <a href="/">
        <Image src={logo} className="w-12 ml-5" alt="logo" />
      </a> */}
      {/* <!-- Profile dropdown --> */}
      <div className="flex flex-row items-center justify-between w-full h-full" ref={userSettingsRef}>
        <div className="w-36 h-full flex items-center justify-center gap-2 text-blue-500">
          Points:
          <div className="rounded-md bg-[#43c5f4] py-[0.30rem] px-4 text-black font-lato hover:scale-105 transition-all ease-in cursor-pointer select-none">
            {user && user.points}
          </div>
        </div>
        <div className="w-16 h-full flex items-center justify-center">
          <button onClick={() => setIsUserMenuOpen((curr) => !curr)} type="button" className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user && user.name}`} alt="" />
          </button>
        </div>

        {isUserMenuOpen ?
          <div className="absolute right-0 top-12 z-10 mt-2 w-48 origin-top-right rounded-md bg-white overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
            <a href="/Profile" className="block px-4 pb-2 pt-3 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>

            {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a> */}

            <div onClick={() => { }} className="cursor-pointer block px-4 pt-2 pb-3 text-sm text-red-500 hover:bg-red-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</div>
          </div>
          :
          null}

      </div>
    </div>
  )
}

export default NavBar