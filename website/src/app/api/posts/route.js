import ImageKit from "imagekit"
import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0"

export const POST = withApiAuthRequired(async function handler(req, res) {
    const { user } = await getSession(req, res)
    const client = new MongoClient(process.env.MONGO_URI)
    const body = await req.json()
    const postId = crypto.randomUUID()
    let accessToken
    let username

    try {
        await client.connect()
        const database = client.db('data')
        const collection = database.collection('posts')
        const imageKit = new ImageKit({
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            urlEndpoint: process.env.IMAGEKIT_URL
        })

        fetch(`${process.env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: `${process.env.AUTH0_CLIENT_ID}`,
                client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
                audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`
            })
        }).then(res => {
            return res.json()
        }).then(data => {
            return data.access_token
        }).then(data => {
            accessToken = data
        }).finally(() => {
            const userDataURL = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users?q=${encodeURIComponent(`email:"${user.name}"`)}&search_engine=v3`
            fetch(userDataURL, {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${accessToken}`
                }
            }).then(res => {
                return res.json()
            }).then(data => {
                return data[0].username
            }).then(un => {
                username = un
            }).finally(() => {
                imageKit.upload({
                    file: body.imageData,
                    fileName: postId,
                    useUniqueFileName: false
                }, (err) => {
                    if (err) NextResponse.error()
                })

                collection.insertOne({
                    text: body.text,
                    imageUrl: `${process.env.IMAGEKIT_URL}/${postId}`,
                    postId: postId,
                    username: username,
                    name: user.name,
                    comments: []
                })
            })
        })
        return NextResponse.json({ message: 'success' }, { status: 200 })
    } catch (e) {
        return NextResponse.error()
    }
})

export async function GET() {
    const client = new MongoClient(process.env.MONGO_URI)
    try {
        await client.connect()
        const database = client.db('data')
        const collection = database.collection('posts')
        const response = await collection.find({}).toArray()
        return NextResponse.json(response, { status: 200 })
    } catch (e) {
        return NextResponse.error()
    }
}