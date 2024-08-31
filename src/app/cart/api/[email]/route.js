


// import { connectDB } from "@/lib/connectDB";
// import { NextResponse } from "next/server";

// export const GET = async (request, { params }) => {
//   try {
//     // Assuming 'email' will be passed as a route parameter
//     const { email } = params; // Extract email from params
//     console.log(params); // For debugging

//     let db = await connectDB();
//     let selectedCollection = db.collection('selected');

//     // Perform aggregation
//     let aggregatedResults = await selectedCollection.aggregate([
//       {
//         $match: { buyerEmail: email } // Match documents where 'buyerEmail' matches the provided email
//       },
//       {
//         $group: {
//           _id: { itemName: "$itemName", category: "$category",originalId: "$selectedId$selectedId"},
//           count: { $sum: 1 }, // Count the number of documents in each group
//           totalUnitPrice: { $sum: { $toDouble: "$unitPrice" } } // Sum up the unitPrice values
//         }
//       },
//       {
//         $project: {
//           _id: "$selectedId",
//           itemName: "$_id.itemName",
//           category: "$_id.category",
//           count: 1,
//           totalUnitPrice: 1
//         }
//       }
//     ]).toArray();

//     // Return the aggregated results as JSON
//     return NextResponse.json(aggregatedResults, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
//   }
// };




import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (request, { params }) => {
  try {
    // Assuming 'email' will be passed as a route parameter
    const { email } = params; // Extract email from params
    console.log(params); // For debugging

    let db = await connectDB();
    let selectedCollection = db.collection('selected');

    // Perform aggregation
    let aggregatedResults = await selectedCollection.aggregate([
      {
        $match: { buyerEmail: email } // Match documents where 'buyerEmail' matches the provided email
      },
      {
        $group: {
          _id: { 
            itemName: "$itemName", 
            category: "$category", 
            originalId: "$selectedId", // Keep the original _id from each document
            perUnitPrice:"$unitPrice"
          },
          count: { $sum: 1 }, // Count the number of documents in each group
          totalUnitPrice: { $sum: { $toDouble: "$unitPrice" } } // Sum up the unitPrice values
        }
      },
      {
        $project: {
          _id: "$_id.originalId", // Use the original _id field in the projection
          itemName: "$_id.itemName",
          category: "$_id.category",
          perUnitPrice:"$_id.perUnitPrice",
          count: 1,
          totalUnitPrice: 1
        }
      }
    ]).toArray();

    // Return the aggregated results as JSON
    return NextResponse.json(aggregatedResults, { status: 200 });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
  }
};
