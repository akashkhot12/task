// app.js
const express = require("express");
const { connectToDb } = require("./connections");

const app = express();
const port = 3000;

app.get("/books", async (req, res) => {
  try {
    const db = await connectToDb();
    const books = db.collection("books");

    const pipeline = [
      {
        $lookup: {
          from: "authors", // Correct collection name to join
          localField: "author_id", // Field in the books collection
          foreignField: "_id", // Field in the authors collection
          as: "author", // The name for the array field containing the matching documents
        },
      },
      {
        $lookup: {
          from: "publishers", // Correct collection name to join
          localField: "publisher_id", // Field in the books collection
          foreignField: "_id", // Field in the publishers collection
          as: "publisher", // The name for the array field containing the matching documents
        },
      },
      {
        $lookup: {
          from: "audiobooks", // Correct collection name to join
          localField: "audiobook_id", // Field in the books collection
          foreignField: "_id", // Field in the audiobooks collection
          as: "audiobook", // The name for the array field containing the matching documents
        },
      },
      {
        $lookup: {
          from: "narrators", // Correct collection name to join
          localField: "narrator_id", // Field in the books collection
          foreignField: "_id", // Field in the narrators collection
          as: "narrator", // The name for the array field containing the matching documents
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true, // Include books even if they don't have a matching author
        },
      },
      {
        $unwind: {
          path: "$publisher",
          preserveNullAndEmptyArrays: true, // Include books even if they don't have a matching publisher
        },
      },
      {
        $unwind: {
          path: "$audiobook",
          preserveNullAndEmptyArrays: true, // Include books even if they don't have a matching audiobook
        },
      },
      {
        $unwind: {
          path: "$narrator",
          preserveNullAndEmptyArrays: true, // Include books even if they don't have a matching narrator
        },
      },
    ];

    const result = await books.aggregate(pipeline).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
