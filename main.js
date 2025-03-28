import express from "express";
import dotenv from "dotenv";

const app = express();

app.use(express.json());

app.route("/").get((req, res) => {
    res.send("Hello World");
});

const PORT = 8000;
app.listen(PORT, (req, res) => {
    console.log(`Server runs at http://localhost:${PORT}`);
});
