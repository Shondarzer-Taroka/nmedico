// const { connectDB } = require("@/lib/connectDB");
// const { NextResponse } = require("next/server");

// export const  GET = async ({ params }) => {
//     console.log(params);
    
//     try {
//         let db = await connectDB();
//         let productsCollection = db.collection('products');
//         // Assuming `params.category` is the category name string or object { category: "categoryName" }
//         let result = await productsCollection.find({ category: params.category }).toArray();
//         // Return the results as a JSON response
//         return NextResponse.json(result, { status: 200 });
//     } catch (error) {
//         console.error("Error fetching products by category:", error);
//         return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
//     }
// };




const { connectDB } = require("@/lib/connectDB");
const { NextResponse } = require("next/server");

export const GET = async (request,{ params }) => {
    try {
        // Log to debug if params are coming correctly
        let {category}=params
        console.log(category); 
        // let bn=await request.json()
        // console.log('bn',bn);
        

        // Connect to the database
        let db = await connectDB();
        let productsCollection = db.collection('products');

        // Query using the category parameter
        // Ensure params.category exists and is a string
        if (!params.category) {
            return NextResponse.json({ message: 'Category is required' }, { status: 400 });
        }

        let result = await productsCollection.find({ category: category }).toArray();

        // Return the results as a JSON response
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        console.error("Error fetching products by category:", error);
        return NextResponse.json({ message: 'Error fetching data', error: error.message }, { status: 500 });
    }
};
