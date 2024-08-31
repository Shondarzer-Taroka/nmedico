// File: /app/cart/itemName/api/[name].js

import { connectDB } from "@/lib/connectDB"; // Adjust the import according to your setup

export default async function handler(req, res) {
    const { method } = req;
    const { name } = req.query; // Extract 'name' from the URL, which represents itemName

    let db = await connectDB();
    let selectedCollection = db.collection('selected');

    switch (method) {
        case 'GET':
            try {
                // Fetch the item by name
                const item = await selectedCollection.findOne({ itemName: name });
                if (item) {
                    res.status(200).json(item);
                } else {
                    res.status(404).json({ message: 'Item not found' });
                }
            } catch (error) {
                console.error('Error fetching item:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'PUT':
            try {
                const { count, totalUnitPrice } = req.body; // Get the data from the request body

                // Update the document in the collection
                const result = await selectedCollection.updateOne(
                    { itemName: name }, // Filter by itemName
                    { $set: { count: count, totalUnitPrice: totalUnitPrice } } // Update count and price
                );

                if (result.modifiedCount > 0) {
                    res.status(200).json({ message: 'Item updated successfully' });
                } else {
                    res.status(404).json({ message: 'Item not found' });
                }
            } catch (error) {
                console.error('Error updating item:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
            break;
        case 'DELETE':
            // Handle DELETE requests if necessary
            break;
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
