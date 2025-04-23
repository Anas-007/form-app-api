const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // enter your MySQL password here
  database: 'formapp'
});

db.connect(err => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Database connected ✅");
  }
});


// Storage setup for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage: storage });

// API: Upload name + image
app.post("/upload", (req, res) => {
  const name = req.body.name;
  const image = req.body.image;

  db.query("INSERT INTO users (name, image) VALUES (?, ?)", [name, image], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving to database");
    } else {
      res.status(200).send("Data saved successfully!");
    }
  });
});

app.get("/status", (request, response) => {
    response.send("it is good");
  });


  app.get("", (request, response) => {
    response.send("it is good");
  });
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
