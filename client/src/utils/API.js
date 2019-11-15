import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/saved");
  },
  // Deletes the book with the given id
  // deleteBook: function(id) {
  //   return axios.delete("/api/books/saved/" + id);
  // },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  getRecipes: function(query) {
    console.log(query);
    return axios.get("/api/books/recipes", { params: { q: query } });
  },
  getGoogleBooks: function(query) {
    console.log(query);
    return axios.get("/api/books/googlebooks", { params: { q: query } });
  }
};
