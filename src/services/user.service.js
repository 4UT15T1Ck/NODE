import db from "../database/mongodb.js";
import { ObjectId } from "mongodb";

const mongoDB = await db.getDB();

const GetAll = async () => {
    const userList = await mongoDB.collection("users").find().toArray();
    return userList;
};

const GetById = async (id) => {
    const user = await mongoDB.collection("users").findOne({ _id: new ObjectId(id) });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

const GetByField = async (field, condition) => {
    const result = await mongoDB.collection("users").find({ [field]: condition }).toArray();
    if (!result || result.length === 0) {
        throw new Error("User not found");
    }
    return result;
};

const CreateUser = async (data) => {
    const result = await mongoDB.collection("users").insertOne(data);
    if (result.insertedId) {
        return result.insertedId;
    }
    throw new Error("User creation failed");
};

const UpdateUserByID = async (id, data) => {
    const result = await mongoDB.collection("users").updateOne({ _id: new ObjectId(id) }, { $set: data });
    if (result.matchedCount === 0) {
        throw new Error("User not found");
    }
    return result.modifiedCount > 0;
};


const DeleteUserByID = async (id) => {
    const result = await mongoDB.collection("users").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
        throw new Error("User not found");
    }
    return result.deletedCount > 0;
};

export default { GetAll, GetById, CreateUser, UpdateUserByID, GetByField, DeleteUserByID };
