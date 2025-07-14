import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3001;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    await client.db("lab1-social-media").command({ ping: 1 });
    console.log("Successfully connected to the database!");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.json({ message: "Successfully connected to the database!" });
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
