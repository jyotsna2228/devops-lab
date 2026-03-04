const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "CustomerDB"; // use exact case of your DB

async function main() {
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("customers");

        // 1️⃣ Select all records
        const allCustomers = await collection.find({}).toArray();
        console.log("\nAll Customers:");
        console.log(allCustomers);

        // 2️⃣ Delete a specific record (condition example)
        // Change the condition as needed (name, age, city, etc.)
        const deleteCondition = { name: "Amit Sharma" };

        const deleteResult = await collection.deleteOne(deleteCondition);

        if (deleteResult.deletedCount === 1) {
            console.log("\nRecord deleted successfully:", deleteCondition);
        } else {
            console.log("\nNo matching record found to delete.");
        }

        // (Optional) Show records after deletion
        const remainingCustomers = await collection.find({}).toArray();
        console.log("\nCustomers After Deletion:");
        console.log(remainingCustomers);

    } catch (error) {
        if (error.name === "MongoNetworkError") {
            console.error("MongoDB connection failed");
        } else {
            console.error("Database operation error:", error.message);
        }
    } finally {
        await client.close();
        console.log("\nMongoDB connection closed");
    }
}

// Run the script
main();
