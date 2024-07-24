const { connectToDb } = require("../connections");

// get all author
const getAllAuthor = async (req, res) => {
  try {
    const db = await connectToDb();
    const authors = db.collection("authors");
    const result = await authors.find().toArray();
    res.status(200).json({ message: result });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// get how much author
const countAuthors = async (req, res) => {
  try {
    const db = await connectToDb();
    const authors = db.collection("authors");
    const result = await authors.find().count();
    res.status(200).json({ message: "total authors is " + result });
  } catch (error) {
    res.status(500).json({ message: err });
  }
};

// every author has how much books. count of every author books.

const countAuthorBooks = async (req, res) => {
  try {
    const db = await connectToDb();
    const authors = db.collection("books");
    const result = await authors
      .aggregate([
        {
          $group: {
            _id: "$author_id", // Group by author_id
            bookCount: { $sum: 1 }, // Count the number of books for each author
          },
        },
        {
          $lookup: {
            from: "authors", // The collection to join
            localField: "_id", // Field from the books collection
            foreignField: "_id", // Field from the authors collection
            as: "author", // Output array field
          },
        },
        {
          $unwind: "$author", // Flatten the array of authors
        },
        {
          $project: {
            _id: 0, // Exclude _id from the result if not needed
            fullName: {
              $concat: [
                "$author.first_name", // First name field
                " ", // Space between first name and last name
                "$author.last_name" // Last name field
              ]
            }, // Replace with the actual field name for the author's first name
            bookCount: 1, // Include the count of books
          },
        },
      ])
      .toArray();
    res.status(200).json({ message: result });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = { getAllAuthor, countAuthors, countAuthorBooks };
