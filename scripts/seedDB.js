const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

const bookSeed = [
  {
    title: "The Life of Peter",
    authors: "Peter",
    description: "Reasonably fun",
    date: new Date(Date.now())
  },
  {
    title: "How to Train Your Elephant",
    authors: "Bob",
    description: "More elephants than you expect",
    date: new Date(Date.now())
  }
];

// db.Book
//   .remove({})
//   .then(() =>
db.Book.collection
  .insertMany(bookSeed)
  // )
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
