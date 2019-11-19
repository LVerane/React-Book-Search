import React, { Component } from "react";
import { Container, ViewBtn } from "../components/Grid";
import API from "../utils/API";
import { List, ListItem } from "../components/List";
import DeleteBtn from "../components/DeleteBtn";

class Saved extends Component {
  state = {
    books: []
  };

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
                  {book.title} by {book.authors}
                </strong>
              </div>
              <img src={book.image} alt={book.title}></img>
              <p>{book.description}</p>
              <DeleteBtn
                id={book._id}
                onClick={() => this.deleteBook(book._id)}
              />
              <ViewBtn href={book.link} />
            </ListItem>
          ))}
        </List>
      </Container>
    );
  }
}

export default Saved;
