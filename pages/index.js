import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import Image from "next/image";
import searchIcon from "./../public/icons/search-icon.png";
import { useRouter } from "next/router";

function Home() {
  const [user, setUser] = useState();
  const [topicSelection, setTopicSelection] = useState(0);
  const searchBarRef = useRef();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  // const topics = ["World", "Business", "Technology", "Health"];
  const topics = [
    {
      name: "World",
      image: "https://i.imgur.com/WMIu29G.jpg",
    },
    {
      name: "Business",
      image: "https://i.imgur.com/bSCF5ad.png",
    },
    {
      name: "Technology",
      image: "https://i.imgur.com/E7CCmaA.png",
    },
    {
      name: "Health",
      image: "https://i.imgur.com/XZTcOSv.png",
    },
  ];

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabaseClient.auth.getUser();
      if (user) {
        // Get user from my own custom MySQL database
        const res = await fetch("/api/getUserObject", {
          method: "PATCH",
          body: JSON.stringify({
            id: user.id,
          }),
        });

        const { data } = await res.json();
        setUser(data);
      }
    };

    getUser();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh]">
      <NavBar user={user} />
      <div className="px-7 w-full">
        <div className="flex items-center justify-center flex-col w-full h-full gap-5">
          <div className="flex items-center justify-center gap-2">
            <div className="font-bold text-lg">
              What will you search today?
            </div>
            <Image
              src={searchIcon}
              width={30}
              className="aspect-square"
            />
          </div>

          <div>
            <h1 className="font-bold text-xl">
              Search for topics
            </h1>
            <div className="flex items-center justify-center flex-row gap-2 mt-1">
              <input
                ref={searchBarRef}
                className="px-3 py-1 rounded-xl"
              />
              <button
                onClick={() =>
                  router.push(
                    `/search?q=${searchBarRef.current.value}`
                  )
                }
                className="bg-[#43c5f4] px-3 py-1 rounded-xl"
              >
                Go
              </button>
            </div>
          </div>

          <h1 className="font-bold text-xl">
            Trending topics
          </h1>
          <div className="flex items-center justify-center gap-2">
            {topics.map((topic, key) => {
              return (
                <div
                  onClick={() => setTopicSelection(key)}
                  className={`${
                    topicSelection !== key
                      ? "bg-white"
                      : "bg-yellow-200"
                  } cursor-pointer rounded-xl px-2 py-1`}
                >
                  {topic.name}
                </div>
              );
            })}
          </div>
          <div>
            <img
              className="rounded-xl"
              src={topics[topicSelection].image}
            />
            <button
              onClick={() =>
                router.push(
                  `/search?q=${topics[topicSelection].name}`
                )
              }
              className="w-full mt-5 border-2 border-black text-black bg-yellow-200 focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return {
    props: {
      user: session.user,
    },
  };
};

export default Home;
