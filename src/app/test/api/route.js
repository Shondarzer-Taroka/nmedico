import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const GET =async ()=>{
try {
    let db=await connectDB()
    let productsCollecion=db.collection('products')
    let result=await productsCollecion.find().toArray()
    return NextResponse.json(result)
} catch (error) {
    return NextResponse.json('something wrong')
}
}