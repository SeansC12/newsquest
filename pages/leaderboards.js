import React, { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import NavBar from "../components/NavBar";
import { query } from "../lib/db";

function Leaderboards({ data }) {
  const [user, setUser] = useState();
  const supabaseClient = useSupabaseClient();

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
    <div>
      <NavBar user={user} />
      {data &&
        data.map(
          (person, key) =>
            user && (
              <div
                className={`flex items-center justify-between flex-row w-full ${
                  user.name === person.name
                    ? "font-bold"
                    : null
                }`}
                key={key}
              >
                <div className="w-20 flex items-center justify-center">
                  {key + 1}
                </div>
                <div>
                  {person.name}{" "}
                  {user.name === person.name
                    ? "(YOU)"
                    : null}
                </div>
                <div className="w-20 flex items-center justify-center">
                  {person.points}
                </div>
              </div>
            )
        )}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const supabaseClient = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabaseClient.auth.getSession();

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    const data = await query({
      query: "SELECT name, points FROM users;",
    });

    // Sort the data
    data.sort((a, b) => {
      if (a.points > b.points) return -1;
      if (a.points < b.points) return 1;
      return 0;
    });

    return {
      props: {
        data: data,
      },
    };
  }
};

export default Leaderboards;
