// import { connectDB } from "@/lib/connectDB"
// import { NextResponse } from "next/server"


// export const POST=async(request)=>{
// let payment=await request.json()
// let db=await connectDB()
// let paymentCollection=db.collection('payments')
// try {
//     let result=await paymentCollection.insertOne(payment)
//     return NextResponse.json({message:'successfully added',result},{status:200})
// } catch (error) {
//     return NextResponse.json({message:'something went wrong'},{status:500})
// }
// }



import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        // Parse the request body as JSON
        const payment = await request.json();

        // Connect to the database
        const db = await connectDB();
        const paymentCollection = db.collection('payments');

        // Insert the payment into the collection
        const result = await paymentCollection.insertOne(payment);

        // Return a success response
        return NextResponse.json({ message: 'Successfully added', result }, { status: 200 });
    } catch (error) {
        console.error("Error adding payment:", error);

        // Return an error response
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
};
