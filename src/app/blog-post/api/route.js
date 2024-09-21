import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const POST = async (requets) => {
    try {
        let db = await connectDB()
        let post = await requets.json()
        let blogCollection = db.collection('blog')
        let result = await blogCollection.insertOne(post)
        return NextResponse.json({ message: 'successfully posted', result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went to wrong' }, { status: 500 })
    }
}


export const GET = async () => {
    try {
        let db = await connectDB()
        let blogCollection = db.collection('blog')
        let result = await blogCollection.find().limit(6).toArray()
        return NextResponse.json({ message: 'successfully found', result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went to wrong' }, { status: 500 })
    }
}




