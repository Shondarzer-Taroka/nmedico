import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        let db = await connectDB()
        let blogCollection = db.collection('blog')
        let result = await blogCollection.find().toArray()
        return NextResponse.json({ message: 'successfully found', result }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'something went to wrong' }, { status: 500 })
    }
}