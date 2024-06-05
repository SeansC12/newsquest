import { useSupabaseClient } from "@supabase/auth-helpers-react";
import React, { useRef, useState } from "react";
import welcome from "./../public/welcome.png";
import login from "./../public/login.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState("");
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const loginHandler = async (email, password) => {
    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/");
  };

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center flex-col">
      <Image src={welcome} className="w-full" />
      <div className="flex flex-col items-center justify-center px-6 pt-0 -mt-7 pb-8 w-full mx-auto md:h-screen lg:py-0">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : null}
        <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Your email
              </label>
              <input
                ref={usernameRef}
                autoComplete="on"
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                placeholder="name@company.com"
                required=""
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                ref={passwordRef}
                autoComplete="on"
                type="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                required=""
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start"></div>
              <a
                href="#"
                className="text-sm font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <button
              onClick={() =>
                loginHandler(
                  usernameRef.current.value,
                  passwordRef.current.value
                )
              }
              type="submit"
              className="w-full text-white bg-[#2563eb] focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Sign In
            </button>
            {/* <button onClick={() => loginHandler(usernameRef.current.value, passwordRef.current.value)} type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm text-center"><Image src={login} /></button> */}
            <p className="text-sm font-light text-gray-500">
              Don’t have an account yet?{" "}
              <a
                href="/SignUp"
                className="font-medium hover:underline"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
