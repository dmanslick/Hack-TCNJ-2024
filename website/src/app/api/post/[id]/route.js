import { MongoClient } from "mongodb"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const client = new MongoClient(process.env.MONGO_URI)
    try {
        await client.connect()
        const database = client.db('data')
        const collection = database.collection('posts')
        const response = await collection.findOne({ postId: params.id })
        return NextResponse.json(response, { status: 200 })
    } catch (e) {
        return NextResponse.error()
    } finally {
        client.close()
    }
}