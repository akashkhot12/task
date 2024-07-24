const { connectToDb } = require("../connections");

const getAllAuthor = async (req, res) => {
  try {
    const db = await connectToDb();
    const authors = db.collection("authors");
    const result = await authors.find().toArray();
    res.status(200).json({message:result})
  } catch (err) {
    res.status(500).json({message:err});
  }
};


module.exports = {getAllAuthor}
