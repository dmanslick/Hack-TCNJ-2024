'use client'
import { useUser } from '@auth0/nextjs-auth0/client'
import { Editor } from '@tinymce/tinymce-react'
import { notFound } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import useSWR from 'swr'

export default function page({ params }) {
    const { user } = useUser()
    const editorRef = useRef()
    const [loading, setLoading] = useState()

    const fetcher = url => fetch(url).then(r => r.json())
    const { data, error, isLoading } = useSWR(`/api/post/${params.id}`, fetcher)

    const createComment = () => {
        fetch(`/api/comment/${params.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: editorRef.current.getContent(),
                name: user.name
            })
        }).then(res => {
            if (res.status == 200) {
                console.log('this works')
            } else {
                console.log('this does not work')
            }
        })
    }

    if (isLoading) {
        return (
            <div className='flex justify-center items-center mx-auto'>
                <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    } else if (error) {
        notFound()
    } else {
        return (
            <div className='flex flex-col items-center max-w-screen-sm mx-auto'>
                <div className='mb-12'>
                    <small>{data.username}</small>
                    <img src={data.imageUrl} alt={`${data.username} haircut image`} className='h-72' />
                    <div className='prose' dangerouslySetInnerHTML={{ __html: data.text }}>
                    </div>
                </div>
                {user && (
                    <div>
                        <p className='mb-1'>Leave a Comment:</p>
                        <Editor
                            onInit={(evt, editor) => {
                                editorRef.current = editor
                                setLoading(false)
                            }}
                            apiKey='h4yfjb0thvvvaye2tek7ufkmitx74ylf64ex33gh6gonzir5'
                            init={{
                                height: 256,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                        <button className='bg-zinc-900 rounded px-3 py-2 text-white mr-2 mt-2 text-sm hover:bg-zinc-800' onClick={createComment}>Comment</button>
                    </div>
                )}
                {data.comments.length == 0 && (
                    <p>No comments yet</p>
                )}
                {data.comments.length > 0 && (
                    <div className='flex flex-col gap-10 mt-10 self-start'>
                        {data.comments.map(comment => {
                            return (
                                <div>
                                    <small>{comment.username}</small>
                                    <div dangerouslySetInnerHTML={{ __html: comment.text }} key={crypto.randomUUID}></div>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}
