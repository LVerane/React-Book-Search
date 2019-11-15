const db = require("../models");
const axios = require("axios");
// const dotenv = require("dotenv").config();
// console.log(process.env.REACT_APP_GOOGLE_API_KEY);
// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Book.find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Book.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Book.create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Book.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Book.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findRecipes: function(req, res) {
    // console.log(req);
    axios
      .get("http://www.recipepuppy.com/api/", { params: req.query })
      .then(({ data: { results } }) => res.json(results))
      .catch(err => res.status(422).json(err));
  },
  findGoogleBooks: function(req, res) {
    console.log("hit books controller");
    // console.log(req.query.q);
    axios
      .get(
        // "https://www.googleapis.com/books/v1/volumes?q=" +
        //   req.query.q +
        //   "&key=" +
        "https://www.googleapis.com/books/v1/volumes?q=" + req.query.q
        // "https://www.googleapis.com/books/v1/volumes?q=harry+potter&key=" +
        // process.env.REACT_APP_GOOGLE_API_KEY
      )
      .then(results => {
        // console.log(results);
        res.json(results.data.items);
      })
      .catch(err => res.json(err));
  }
  // router.get("/recipes", (req, res) => {
  // });
};
//https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes
