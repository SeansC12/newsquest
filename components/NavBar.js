import React, { useRef, useState } from 'react'
import useOutsideClickAlerter from "./../hooks/useOutsideClickAlerter"
import { useRouter } from 'next/router';

function NavBar({ user }) {
  const userSettingsRef = useRef();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();

  useOutsideClickAlerter(() => {
    setIsUserMenuOpen(false)
  }, userSettingsRef)

  return (
    <div
      className={"sticky z-50 top-0 bg-[#0e141b] text-white border-b-[1px] mb-4 border-b-gray-800 h-16 w-full"}
    >
      {/* <a href="/">
        <Image src={logo} className="w-12 ml-5" alt="logo" />
      </a> */}
      {/* <!-- Profile dropdown --> */}
      <div className="flex flex-row items-center justify-between w-full h-full" ref={userSettingsRef}>
        <div className="w-48 h-full flex items-center justify-center gap-2 text-blue-500">
          Points:
          <div className="rounded-md bg-[#43c5f4] py-[0.30rem] px-4 text-black font-lato hover:scale-105 transition-all ease-in cursor-pointer select-none">
            {user && user.points}
          </div>
          <div onClick={() => router.reload()}>
            <svg fill="#fff" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 489.645 489.645" xmlSpace="preserve"><g><path d="M460.656,132.911c-58.7-122.1-212.2-166.5-331.8-104.1c-9.4,5.2-13.5,16.6-8.3,27c5.2,9.4,16.6,13.5,27,8.3c99.9-52,227.4-14.9,276.7,86.3c65.4,134.3-19,236.7-87.4,274.6c-93.1,51.7-211.2,17.4-267.6-70.7l69.3,14.5c10.4,2.1,21.8-4.2,23.9-15.6c2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25,16.6-23.9,22.9l15.6,123.8c1,10.4,9.4,17.7,19.8,17.7c12.8,0,20.8-12.5,19.8-23.9l-6-50.5c57.4,70.8,170.3,131.2,307.4,68.2C414.856,432.511,548.256,314.811,460.656,132.911z" /></g></svg>
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

            <a href="/Leaderboards" className="block px-4 py-2 text-sm text-gray-700 hover:bg-slate-200" role="menuitem" tabindex="-1" id="user-menu-item-1">Leaderboards</a>

            <div onClick={() => { }} className="cursor-pointer block px-4 pt-2 pb-3 text-sm text-red-500 hover:bg-red-200" role="menuitem" tabindex="-1" id="user-menu-item-2">Log out</div>
          </div>
          :
          null}

      </div>
    </div>
  )
}

export default NavBar