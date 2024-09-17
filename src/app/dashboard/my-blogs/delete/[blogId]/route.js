// import { connectDB } from "@/lib/connectDB"
// import { ObjectId } from "mongodb"
// import { NextResponse } from "next/server"

// export const DELETE=async(request,{params})=>{
//     try {
//         let db=await connectDB()
//         let blogId=params.blogId
//         let blogCollection= db.collection('blog')
//         let result= await blogCollection.deleteOne({_id:new ObjectId(blogId)})
//         return NextResponse.json({message:'deleted successfully',result},{status:200})
//     } catch (error) {
//         return NextResponse.json({message:'failed to delete blog',error:error.message},{status:500})
        
//     }
// }




import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Make sure to import ObjectId from mongodb

export const DELETE = async (request, { params }) => {
    try {
        // Connect to the database
        let db = await connectDB();

        // Extract blogId from params and convert it to an ObjectId
        let blogId = params.blogId;
        if (!ObjectId.isValid(blogId)) {
            return NextResponse.json({ message: 'Invalid blog ID' }, { status: 400 });
        }

        // Access the blog collection
        let blogCollection = db.collection('blog');

        // Attempt to delete the blog
        let result = await blogCollection.deleteOne({ _id: new ObjectId(blogId) });

        // Check if any document was deleted
        if (result.deletedCount === 0) {
            return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
        }

        // Return success response
        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });

    } catch (error) {
        // Return error response
        return NextResponse.json({ message: 'Failed to delete blog', error: error.message }, { status: 500 });
    }
};



