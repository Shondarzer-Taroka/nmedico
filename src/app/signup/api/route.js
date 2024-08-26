import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
    let newUser = await request.json();
    try {
        let db = await connectDB();
        let usersCollection = db.collection('users');

        // Check if the user already exists using findOne instead of find
        let exist = await usersCollection.findOne({ email: newUser.email });
        if (exist) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Hash password asynchronously
        let hashPassword = await bcrypt.hash(newUser.password, 14);

        // Insert the new user with the hashed password
        await usersCollection.insertOne({ ...newUser, password: hashPassword });

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
}
