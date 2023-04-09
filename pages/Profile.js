import React, { useEffect, useRef, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import NavBar from '../components/NavBar';

function Profile() {
  // const [user] = useUser();
  const [changesMade, setChangesMade] = useState(false);
  const nameRef = useRef();
  const [user, setUser] = useState();
  const [supabaseUser, setSupabaseUser] = useState();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    const getUser = async () => {
      // Supabase user
      const { data: { user } } = await supabaseClient.auth.getUser();
      setSupabaseUser(user);

      if (user) {
        // Get user from my own custom MySQL database
        const res = await fetch("/api/getUserObject", {
          method: "PATCH",
          body: JSON.stringify({
            id: user.id
          })
        });

        const { data } = await res.json();
        setUser(data);
      }
    }

    getUser();
  }, [])

  const handleNameChange = () => {
    if (nameRef.current.value === user.name) {
      // No changes made
      setChangesMade(false);
      return
    }

    setChangesMade(true);
  }

  const handleSubmit = () => {
    // Update SQL database
    (async () => {
      await fetch("/api/patchName", {
        method: "PATCH",
        body: JSON.stringify({
          name: nameRef.current.value,
          userID: user.person_id
        })
      })
    })()

    router.push("/")
  }

  return (
    <>
      <NavBar user={user} />
      <div className="flex items-center justify-start flex-col w-[100vw] h-[100vh]">
        <div className="px-10 flex justify-center items-center text-black">
          <div className="flex gap-5 items-center justify-center">
            <img src={`https://ui-avatars.com/api/?name=${user && user.name}`} className="rounded-full w-24 aspect-square border-black border-2" />
            <div className="flex flex-col gap-1">
              <div className="font-lato">Name</div>
              <input onChange={handleNameChange} ref={nameRef} type="text" defaultValue={user ? user.name : ""} className="text-black w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2"></input>
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className={`mt-10 py-2 px-3 ${changesMade ? "bg-red-500" : "bg-slate-400 pointer-events-none"} text-white w-fit text-sm font-semibold rounded-md shadow focus:outline-none`}>Save changes</button>
      </div>
    </>
  );
}

export default Profile;

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabaseClient = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabaseClient.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}