const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Home Route (HTML Page with Download Button)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>File Download App</title>
        <style>
            body { 
                font-family: Arial; 
                text-align: center; 
                margin-top: 100px; 
            }
            button {
                padding: 10px 20px;
                font-size: 16px;
                background-color: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background-color: #45a049;
            }
        </style>
    </head>
    <body>
        <h2>Node.js File Download Example</h2>
        <button onclick="window.location.href='/download'">
            Download File
        </button>
    </body>
    </html>
  `);
});

// Download Route
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "sample.txt");

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).send("Error: File not found.");
  }

  // Send file as attachment
  res.download(filePath, "sample.txt", (err) => {
    if (err) {
      console.error("Download Error:", err);
      res.status(500).send("Error downloading file.");
    }
  });
});

// Handle Invalid Routes
app.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
