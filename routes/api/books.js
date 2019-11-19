const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router
  .route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/saved"
router.route("/saved").get(booksController.findAll); //was findById bfore
// .put(booksController.update)
router.route("/saved/:id").delete(booksController.remove);

router.route("/googlebooks").get(booksController.findGoogleBooks);

module.exports = router;
