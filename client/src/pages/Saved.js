import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

class Saved extends Component {
  state = {
    books: []
  };
  // Add code to get the book with an _id equal to the id in the route param
  // e.g. http://localhost:3000/books/:id
  // The book id for this route can be accessed using this.props.match.params.id
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res => {
        console.log(res.data);
        this.setState({
          books: res.data
        });
      })
      .catch(err => console.log(err));
  };
  // componentDidMount() {
  //   API.getBook(this.props.match.params.id)
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({ book: res.data });
  //     })
  //     .catch(err => console.log(err));
  //   // console.log(req.params.id);
  // }
  deleteBook = id => {
    console.log(id);
    API.deleteBook(id)
      .then(res => {
        console.log(res);
        this.loadBooks();
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <Container fluid>
        <List>
          {this.state.books.map(book => (
            <ListItem key={book._id}>
              <div>
                <strong>
                  <a href={book.link}>
                    {book.title} by {book.authors}
                  </a>
                </strong>
              </div>
              <img src={book.image} alt={book.title}></img>
              <p>{book.description}</p>
              <DeleteBtn
                id={book._id}
                onClick={() => this.deleteBook(book._id)}
              />
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

export default Saved;
{
  /* {this.state.books.map(book => (
          <div>
            <Row>
              <Col size="md-12">
                <Jumbotron>
                  <h1>
                    {book.title} by {book.authors}
                  </h1>
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col size="md-10 md-offset-1">
                <article>
                  <h1>Description</h1>
                  <p>{book.description}</p>
                </article>
              </Col>
            </Row>
            <Row>
              <Col size="md-2">
                <Link to="/">← Back to Authors</Link>
              </Col>
            </Row>
          </div>
        ))} */
}
