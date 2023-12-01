//@ts-nocheck

import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const connection = `mongodb+srv://wiktor:${process.env.DATABASE_PASSWORD}@cluster0.aomigh0.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(connection);

const connectToDatabase = await client.connect();
const db = await connectToDatabase.db();

export const users = db.collection("users");
export const tasks = db.collection("tasks");
