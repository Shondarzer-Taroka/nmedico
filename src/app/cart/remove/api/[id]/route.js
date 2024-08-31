import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId for proper ID handling

export const DELETE = async (request,{params}) => {
    try {

        console.log(params);
        
        // Connect to the database
        const db = await connectDB();
        const selectedCollection = db.collection('selected');

        // Perform delete operation
        const result = await selectedCollection.deleteMany({ selectedId: params.id });

        if (result.deletedCount > 0) {
            // Return a success response with the count of deleted documents
            return NextResponse.json(
                {
                    message: 'Successfully removed',
                    deletedCount: result.deletedCount, // Provide the count of deleted documents
                },
                { status: 200 }
            );
        } else {
            // Return a response if the document is not found
            return NextResponse.json(
                {
                    message: 'Document not found with provided selectedId',
                },
                { status: 404 }
            );
        }
    } catch (error) {
        console.error("Error in DELETE /cart/increase/api:", error);
        return NextResponse.json(
            {
                message: 'Something went wrong during the delete operation',
                error: error.message, // Include the error message for debugging
            },
            { status: 500 }
        );
    }
};
