// import { MongoClient, ServerApiVersion } from "mongodb"

// let db
// export async function connectDB() {
//     try {
//         if (db) {
//             return db
//         }
//         let uri=process.env.NEXT_PUBLIC_MONGODB_URI
//         let client=new MongoClient(uri,{
//             serverApi:{
//                 version:ServerApiVersion.v1,
//                 strict:true,
//                 deprecationErrors:true
//             }
//         })
//         db=client.db('nmedicoDB')
//         return db;
//     } catch (error) {
//         console.log(error);
        
//     }
// }


import { MongoClient, ServerApiVersion } from 'mongodb';

let db;

export async function connectDB() {
    try {
        // Return cached db connection if it exists
        if (db) {
            return db;
        }

        const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
        const client = new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });

        // Establish the database connection and cache it
        await client.connect();
        db = client.db('nmedicoDB');  // Access the database

        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('Database connection failed');
    }
}
