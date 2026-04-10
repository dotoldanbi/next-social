import React from 'react'

export default async function PostPage({params}) {
    const { id } = await params;
  return (
    <div>PostPage {id}</div>
  )
}
