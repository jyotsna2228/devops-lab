const express = require("express");
const app = express();
const PORT = 3000;

// Set EJS as template engine
app.set("view engine", "ejs");

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Route to display form
app.get("/", (req, res) => {
    res.render("form");
});

// Route to handle POST request
app.post("/submit", (req, res) => {
    const employeeData = {
        name: req.body.name,
        id: req.body.id,
        department: req.body.department,
        salary: req.body.salary
    };

    res.render("result", { employee: employeeData });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
