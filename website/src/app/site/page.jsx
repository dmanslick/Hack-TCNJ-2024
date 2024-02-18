import React from 'react'

async function getPosts() {
    const response = await fetch(`${process.env.WEBSITE_URL}/api/posts`, { method: 'GET', cache: 'no-cache' })
    return response.json()
}

export default async function page() {
    const posts = await getPosts()

    return (
        <div className='container mx-auto flex flex-col items-center gap-y-20'>
            {posts.map(post => {
                return (
                    <div key={crypto.randomUUID}>
                        <small>{post.username}</small>
                        <img src={post.imageUrl} alt="" className='h-56' />
                        <a href={`/posts/${post.postId}`}>Check out post</a>
                    </div>
                )
            })}
        </div>
    )
}
