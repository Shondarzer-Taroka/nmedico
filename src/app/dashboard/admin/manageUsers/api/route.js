import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        let db = await connectDB();
        let usersCollection = db.collection('users');
        let result = await usersCollection.find().toArray();
        
        return NextResponse.json({ message: 'Data retrieved successfully', data: result }, { status: 200 });
    } catch (error) {
        console.error('Error fetching users:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Failed to retrieve data', error: error.message }, { status: 500 });
    }
};

export const PATCH = async (request) => {
    try {
        const { id, role } = await request.json(); // Expecting 'id' and 'role' in the request body
        
        if (!id || !role) {
            return NextResponse.json({ message: 'Invalid data provided' }, { status: 400 });
        }

        let db = await connectDB();
        let usersCollection = db.collection('users');
        
        // Update the user's role based on the provided ID
        let result = await usersCollection.updateOne(
            { _id: new ObjectId(id) }, // Match user by ID
            { $set: { role: role } } // Set the new role
        );

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: 'No user found or role not updated' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Role updated successfully', data: result }, { status: 200 });
    } catch (error) {
        console.error('Error updating user role:', error); // Log the error for debugging
        return NextResponse.json({ message: 'Failed to update role', error: error.message }, { status: 500 });
    }
};
