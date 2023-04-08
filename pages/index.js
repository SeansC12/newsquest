import {
  SupabaseClient,
  useSessionContext,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from "react";
// import { query } from '../lib/db';

export default function Home() {
  const [user, setUser] = useState();
  const supabaseClient = useSupabaseClient();
  const supabaseUser = useUser();

  console.log(user);


  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabaseClient.auth.getUser();
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



  return (
    <div className="w-[100vw] h-[100vh]">
      {/* <Image src={welcome} className="w-" /> */}
      <div>I am {user && user.name} and I have {user && user.points} points</div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }

  return {
    props: {
      user: session.user,
    },
  }
}