// db.js
const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017"; // Replace with your MongoDB URI
const dbName = "book_and_authers"; // Replace with your database name

let db = null;

async function connectToDb() {
  if (db) return db;
  const client = new MongoClient(url);
  await client.connect();
  db = client.db(dbName);
  return db;
}

module.exports = { connectToDb };
