const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "CustomerDB"; // ✅ match existing DB exactly

async function main() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("customers");

        // Insert only if collection is empty
        const count = await collection.countDocuments();
        if (count === 0) {
            const customers = [
                { name: "Amit Sharma", age: 28, city: "Mumbai" },
                { name: "Neha Verma", age: 25, city: "Delhi" },
                { name: "Rahul Mehta", age: 32, city: "Pune" },
                { name: "Sneha Kapoor", age: 29, city: "Bangalore" },
                { name: "Vikram Singh", age: 35, city: "Chennai" }
            ];
4node
            await collection.insertMany(customers);
            console.log("Customer records inserted");
        }

        // Ascending order
        const ascResult = await collection.find().sort({ age: 1 }).toArray();
        console.log("\nAscending Order (by age):");
        console.log(ascResult);

        // Descending order
        const descResult = await collection.find().sort({ age: -1 }).toArray();
        console.log("\nDescending Order (by age):");
        console.log(descResult);

    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        await client.close();
    }
}

main();
