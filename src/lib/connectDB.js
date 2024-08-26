import { MongoClient, ServerApiVersion } from "mongodb"

let db
export async function connectDB() {
    try {
        if (db) {
            return db
        }
        let uri=process.env.NEXT_PUBLIC_MONGODB_URI
        let client=new MongoClient(uri,{
            serverApi:{
                version:ServerApiVersion.v1,
                strict:true,
                deprecationErrors:true
            }
        })
        db=client.db('nmedicoDB')
        return db;
    } catch (error) {
        console.log(error);
        
    }
}