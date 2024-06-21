import { useRouter } from "next/router";
import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

function NewsCard({ data }) {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const clickHandler = async () => {
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();
    if (user) {
      await fetch("/api/addPoints", {
        method: "PATCH",
        body: JSON.stringify({
          id: user.id,
        }),
      });
    }

    router.push(data.url);
  };

  return (
    <div className="px-5 max-w-xl" onClick={clickHandler}>
      <div className="mb-5 border-2 border-black px-2 py-3 rounded-xl">
        <img
          src={data.urlToImage}
          className="mb-2 rounded-xl"
        />
        <h1 className="text-base font-bold">
          {data.title}
        </h1>
        <h2 className="text-sm">{data.description}</h2>
      </div>
    </div>
  );
}

export default NewsCard;
