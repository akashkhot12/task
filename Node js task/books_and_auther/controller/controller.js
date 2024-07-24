// controllers/booksController.js
const { connectToDb } = require('../connections');

async function getBooks(req, res) {
  try {
    const db = await connectToDb();
    const books = db.collection('books');

    const pipeline = [
      {
        $lookup: {
          from: "authors",
          localField: "author_id",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $lookup: {
          from: "publishers",
          localField: "publisher_id",
          foreignField: "_id",
          as: "publisher"
        }
      },
      {
        $lookup: {
          from: "audiobooks",
          localField: "audiobook_id",
          foreignField: "_id",
          as: "audiobook"
        }
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$publisher",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$audiobook",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "narrators",
          localField: "audiobook.narrator_id",
          foreignField: "_id",
          as: "narrator"
        }
      },
      {
        $unwind: {
          path: "$narrator",
          preserveNullAndEmptyArrays: true
        }
      }
    ];

    const result = await books.aggregate(pipeline).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = { getBooks };
