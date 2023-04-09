import React from 'react'
import { useRouter } from 'next/router'

function Search({ data }) {
  console.log(data);
  return (
    <div>Search</div>
  )
}

export default Search

export async function getServerSideProps(context) {
  const NewsAPIObject = require("newsapi");
  const NewsAPI = new NewsAPIObject(process.env.NEWS_API_KEY);
  const query = context.query.q;

  const res = await NewsAPI.v2.everything({
    q: query,
    language: "en",
    page: 1,
  })

  const data = await JSON.stringify(res)

  return {
    props: {
      data: data,
    },
  }
}