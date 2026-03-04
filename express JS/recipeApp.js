const express = require("express");
const methodOverride = require("method-override");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// In-memory recipe storage
let recipes = [
    { id: 1, name: "Maggi", description: "Italian creamy Maggi" },
    { id: 2, name: "Chees Pav", description: "Cheese loaded Pav" }
];

// Home Page
app.get("/", (req, res) => {
    res.render("home", { recipes });
});

// Recipe Details Page
app.get("/recipe/:id", (req, res) => {
    const recipe = recipes.find(r => r.id == req.params.id);
    res.render("recipe", { recipe });
});

// Add Recipe (POST)
app.post("/add", (req, res) => {
    const { name, description } = req.body;

    const newRecipe = {
        id: recipes.length + 1,
        name,
        description
    };

    recipes.push(newRecipe);
    res.redirect("/");
});

// Delete Recipe (DELETE)
app.delete("/delete/:id", (req, res) => {
    recipes = recipes.filter(r => r.id != req.params.id);
    res.redirect("/");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Recipe Book running on http://localhost:${PORT}`);
});
