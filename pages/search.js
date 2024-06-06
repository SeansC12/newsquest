import React, { useState, useEffect } from 'react'
import NewsCard from '../components/NewsCard';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import NavBar from '../components/NavBar';

function Search({ data, query }) {
  const supabaseClient = useSupabaseClient();
  const [user, setUser] = useState();

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
    <div>
      <NavBar user={user} />

      <div className="font-bold px-5 text-lg">Showing results for {query}...</div>
      {data.articles && data.articles.map((newsObject, key) => {
        return <NewsCard data={newsObject} />
      })}
    </div>
  )
}

export async function getServerSideProps(context) {
  const NewsAPIObject = require("newsapi");
  const NewsAPI = new NewsAPIObject(process.env.NEWS_API_KEY);
  const query = context.query.q;

  const res = await NewsAPI.v2.everything({
    q: query,
    language: "en",
    page: 1,
  })

  const data = JSON.stringify(res)

  return {
    props: {
      data: JSON.parse(data),
      query: query,
    },
  }
}

export default Search;
