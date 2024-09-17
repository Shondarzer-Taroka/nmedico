import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb"
import { NextResponse } from "next/server"

export const GET=async (request,{params}) => {
    try {
        let id=await params.id
        let db=await connectDB()
        let blogCollection=db.collection('blog')
        let result=await blogCollection.findOne({_id:new ObjectId(id)})
        return NextResponse.json({message:'found data based on id successfully',result},{status:200})
    } catch (error) {
        return NextResponse.json({message:'something went wrong',error:error.message},{status:500})
    }
}