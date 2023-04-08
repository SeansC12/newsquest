import {
  useSessionContext,
  useSupabaseClient,
  useUser
} from '@supabase/auth-helpers-react';
import welcome from "./../public/welcome.png"
import Image from 'next/image'

export default function Home() {
  const user = useUser();
  console.log(user);
  return (
    <div className="w-[100vw] h-[100vh]">
      {/* <Image src={welcome} className="w-" /> */}
    </div>
  )
}
