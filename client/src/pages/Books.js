import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    authors: "",
    description: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({
          books: res.data,
          title: "",
          authors: "",
          description: ""
        })
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.authors) {
  //     API.saveBook({
  //       title: this.state.title,
  //       authors: this.state.authors,
  //       description: this.state.description
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.getRecipes(this.state.title)
  //     .then(res => {
  //       console.log(res.data);
  //     })
  //     .catch(err => console.log(err));
  // };

  handleFormSubmit = event => {
    event.preventDefault();
    const fixedTitle = this.state.title.replace(/\s/g, "+");
    API.getGoogleBooks(fixedTitle)
      .then(res => {
        // console.log(
        const superArr = [];
        for (let i = 0; i < res.data.length; i++) {
          superArr.push({});
          console.log("i is " + i);
          superArr[i].authors =
            res.data[i].volumeInfo.authors.join(", ") || "data not provided";
          superArr[i].title =
            res.data[i].volumeInfo.title || "data not provided";
          // superArr[i].categories =
          //   res.data[i].volumeInfo.categories || "data not provided";
          superArr[i].description =
            res.data[i].volumeInfo.description || "data not provided";
          superArr[i].image =
            res.data[i].volumeInfo.imageLinks.thumbnail || "data not provided";
          superArr[i].info =
            res.data[i].volumeInfo.infoLink || "data not provided";
          console.log(superArr);
        }
        // console.log(res.data[0].volumeInfo);
        console.log("---------");
        // const bookData = res.data.map(book => [
        //   // { authors: book.volumeInfo.authors },
        //   // { title: book.volumeInfo.title },
        //   // { categories: book.volumeInfo.categories },
        //   // { description: book.volumeInfo.description },
        //   // { thumbnail: book.volumeInfo.imageLinks.thumbnail },
        //   // { infoLink: book.volumeInfo.infoLink }
        //   book.volumeInfo.authors,
        //   book.volumeInfo.title,
        //   book.volumeInfo.categories,
        //   book.volumeInfo.description,
        //   book.volumeInfo.imageLinks.thumbnail,
        //   book.volumeInfo.infoLink
        // ]);
        // console.log(bookData);
        //this works now, not sure if I still want it
        const test = { ...superArr };
        console.log(test);
        // bookData.forEach(element => {
        //   Object.assign({}, element);
        // });
        // console.log(bookData);
        // const test2 = { ...bookData[0] };
        // const test2 =
        // bookData.forEach(element => console.log(element[0]));
        // console.log(test2);
        // console.log(bookData[0]);
        this.setState({ books: superArr });
        // );
        // console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.authors}
                onChange={this.handleInputChange}
                name="authors"
                placeholder="Authors (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="description (Optional)"
              />
              <FormBtn
                // disabled={!(this.state.authors && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map((book, index) => (
                  <ListItem key={book._id || index}>
                    <Link to={"/books/saved/" + book._id}>
                      <strong>
                        {book.title} by {book.authors}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
