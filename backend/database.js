
const { MongoClient } = require("mongodb");
const fs = require('fs');
require('dotenv').config();

async function createDatabase() {

  const client = new MongoClient(process.env.DB_HOST);

  await client.connect();

  const dbName = "reisetopia";
  const collectionName = "hotels";

  const database = client.db(dbName);
  const collection = database.collection(collectionName);

  const rawHotels = fs.readFileSync('hotels.json');
  const hotels = JSON.parse(rawHotels);

  try {
    const insertManyResult = await collection.insertMany(hotels);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  await client.close();
}
async function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {

  const client = new MongoClient(process.env.DB_HOST);
  await client.connect((err,result) => {
    if (err) {
      console.log(`[MongoDB connection] ERROR: ${err}`);
      failureCallback(err); // this should be "caught" by the calling function
  } else {
    console.log("[MongoDB connection] SUCCESS");
    const database = result.db(dbName);
    const collection = database.collection(dbCollectionName);
    successCallback(collection);
  }
  });

  await client.close();
}

createDatabase();

module.exports = {
    initialize,
};
