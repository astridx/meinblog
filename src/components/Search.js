import React, { useState } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { useFlexSearch } from 'react-use-flexsearch'

import Posts from './Posts'

export default function Search({ posts }) {
  const [query, setQuery] = useState('')
  const { localSearchPages } = useStaticQuery(graphql`
    query {
      localSearchPages {
        index
        store
      }
    }
  `)

  const results = useFlexSearch(
    query,
    localSearchPages.index,
    JSON.parse(localSearchPages.store)
  )

  return (
    <>
      <input
        id="search"
        type="search"
        placeholder="Suche in allen Beiträgen ..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <section>
        {query ? (
          results.length > 0 ? (
            <Posts data={results} tags />
          ) : (
            <p>Nichts gefunden.</p>
          )
        ) : (
          <Posts data={posts} tags />
        )}
      </section>
    </>
  )
}
