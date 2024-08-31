



// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";
// import { ObjectId } from "mongodb"; // Import ObjectId if you need to use it for IDs

// export const POST = async (request) => {
//     try {
//         // Parse the selectedId from the request body
//         const { selectedId } = await request.json();
//         console.log("Received selectedId:", selectedId);

//         // Connect to the database
//         const db = await connectDB();
//         const selectedCollection = db.collection('selected');

//         // Check if the document exists using the selectedId
//         const query = await selectedCollection.findOne({ selectedId: selectedId });
//         // console.log("Query result:", query);
       
//         // If the document is found, insert it into the collection again (or handle as needed)
        
        
//         if (query) {
//             let{_id,...newProduct} =query
//             console.log(newProduct);
//             const result = await selectedCollection.insertOne(newProduct);

//             // Return a success response with the inserted document ID
//             return NextResponse.json(
//                 {
//                     message: 'Successfully added',
//                     insertedId: result.insertedId, // Return the inserted ID
//                 },
//                 { status: 200 }
//             );
//         } else {
//             // Return a response if the document is not found
//             return NextResponse.json(
//                 {
//                     message: 'Document not found with provided selectedId',
//                 },
//                 { status: 404 }
//             );
//         }
//     } catch (error) {
//         console.error("Error in POST /cart/increase/api:", error);
//         return NextResponse.json(
//             {
//                 message: 'Something went wrong',
//                 error: error.message, // Include the error message for debugging
//             },
//             { status: 500 }
//         );
//     }
// };





import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"; // Import ObjectId if you need to use it for IDs

export const POST = async (request) => {
    try {
        // Parse the selectedId from the request body
        const { selectedId } = await request.json();
        console.log("Received selectedId:", selectedId);

        // Connect to the database
        const db = await connectDB();
        const selectedCollection = db.collection('selected');

        // Check if the document exists using the selectedId
        const query = await selectedCollection.findOne({ selectedId: selectedId });
       
        // If the document is found, insert it into the collection again (or handle as needed)
        if (query) {
            const { _id, ...newProduct } = query;
            console.log(newProduct);
            const result = await selectedCollection.insertOne(newProduct);

            // Return a success response with the inserted document ID
            return NextResponse.json(
                {
                    message: 'Successfully added',
                    insertedId: result.insertedId, // Return the inserted ID
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
        console.error("Error in POST /cart/increase/api:", error);
        return NextResponse.json(
            {
                message: 'Something went wrong',
                error: error.message, // Include the error message for debugging
            },
            { status: 500 }
        );
    }
};


