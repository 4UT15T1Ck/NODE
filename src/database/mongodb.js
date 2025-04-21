import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config(); 

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if(!uri || !dbName) {
    throw new Error("MongoDB URI or DB name not provided in .env file");
}

const client = new MongoClient(uri);
var db = null;

const connectDB = async ()=> {
  try {
    await client.connect()
    console.log("Connected to MongoDB");

    return client.db(dbName);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    throw error;
  }
};

const getDB = async ()=>{
  db = await connectDB();
  if(!db){
    throw new Error("Database not connected");
  }
  return db;
}



export default {
  connectDB,
  getDB
};