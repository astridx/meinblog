import React from 'react'

import Posts from './Posts'

export default function Search({ posts }) {
  return (
    <>
      <section>
        <Posts data={posts} tags />
      </section>
    </>
  )
}
