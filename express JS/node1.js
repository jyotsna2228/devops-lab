const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const dbName = "collegeDB";

async function main() {
    const client = new MongoClient(url);

    try {
        // Connect to MongoDB
        await client.connect();
        console.log("Connected to MongoDB");

        // Select database and collection
        const db = client.db(dbName);
        const collection = db.collection("student");

        // Student records
        const students = [
            { name: "Amit Sharma", age: 21, course: "Computer Science" },
            { name: "Neha Verma", age: 22, course: "Information Technology" },
            { name: "Rahul Mehta", age: 20, course: "Electronics" },
            { name: "Sneha Kapoor", age: 23, course: "Mechanical" },
            { name: "Vikram Singh", age: 21, course: "Civil" }
        ];

        // Insert multiple records
        const result = await collection.insertMany(students);

        // Display result object
        console.log("Records inserted successfully");
        console.log("Result Object:", result);

    } catch (error) {
        // Robust error handling
        if (error.name === "MongoNetworkError") {
            console.error("MongoDB connection failed");
        } else {
            console.error("Database operation error:", error.message);
        }
    } finally {
        // Close connection
        await client.close();
        console.log("MongoDB connection closed");
    }
}

// Run application
main();
