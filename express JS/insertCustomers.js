const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "CustomerDB";

async function insertData() {
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("customers");

        const customers = [
            { name: "Amit Sharma", age: 28, city: "Mumbai" },
            { name: "Neha Verma", age: 25, city: "Delhi" },
            { name: "Rahul Mehta", age: 32, city: "Pune" }
        ];

        await collection.insertMany(customers);
        console.log("Customers inserted successfully");

    } catch (err) {
        console.error(err.message);
    } finally {
        await client.close();
    }
}

insertData();
