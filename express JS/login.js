const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Login Page
app.get("/", (req, res) => {
    res.send(`
        <html>
        <head>
            <title>User Login</title>
        </head>
        <body>
            <h2>User Login</h2>
            <form action="/login" method="POST">
                <label>Username:</label><br>
                <input type="text" name="username" required><br><br>

                <label>Password:</label><br>
                <input type="password" name="password" required><br><br>

                <input type="submit" value="Login">
            </form>
        </body>
        </html>
    `);
});

// Validation Logic
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Username length validation
    if (username.length > 6) {
        res.send("❌ Username should not contain more than 6 characters");
    } else {
        res.send("✅ Login Successful (Validation Passed)");
    }
});

// Server
app.listen(3000, () => {
    console.log("Login Server running on http://localhost:3000");
});
