import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Container, ViewBtn } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addBook = position => {
    console.log(position);
    console.log(this.state.books[position]);
    API.saveBook({
      title: this.state.books[position].title,
      authors: this.state.books[position].authors,
      description: this.state.books[position].description,
      image: this.state.books[position].image,
      link: this.state.books[position].link
    })
      .then(res => {
        console.log(res);
        alert("book successfully saved");
      })
      .catch(err => console.log(err));
  };

  handleFormSubmit = event => {
    event.preventDefault(); //could add the option to search by author, need to see how that affects the response object
    const fixedTitle = "intitle:" + this.state.title.replace(/\s/g, "+");
    API.getGoogleBooks(fixedTitle)
      .then(res => {
        console.log(res.data);
        const superArr = [];
        for (let i = 0; i < res.data.length; i++) {
          superArr.push({});
          console.log("i is " + i);
          superArr[i].tempId = i;
          try {
            superArr[i].authors = res.data[i].volumeInfo.authors.join(", ");
          } catch {
            superArr[i].authors = "data not provided";
          }
          superArr[i].title =
            res.data[i].volumeInfo.title || "data not provided";
          superArr[i].description =
            res.data[i].volumeInfo.description || "data not provided";
          try {
            superArr[i].image = res.data[i].volumeInfo.imageLinks.thumbnail;
          } catch {
            superArr[i].image = "/";
          }
          superArr[i].link =
            res.data[i].volumeInfo.infoLink || "data not provided";
          console.log(superArr);
        }
        this.setState({ books: superArr });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Jumbotron>
          <h1>Search for a book!</h1>
        </Jumbotron>
        <form>
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title"
          />
          <FormBtn onClick={this.handleFormSubmit}>Search Book</FormBtn>
        </form>
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book.tempId}>
                <div>
                  <strong>
                    {book.title} by {book.authors}
                  </strong>
                </div>
                <img src={book.image} alt={book.title}></img>
                <p>{book.description}</p>
                <SaveBtn
                  id={book.tempId}
                  onClick={() => this.addBook(book.tempId)}
                />
                <ViewBtn href={book.link} />
              </ListItem>
            ))}
          </List>
        ) : (
          <h3>No Results to Display</h3>
        )}
      </Container>
    );
  }
}

export default Books;
