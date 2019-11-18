import React, { Component } from "react";
import SaveBtn from "../components/SaveBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: ""
  };

  // componentDidMount() {
  //   this.loadBooks();
  // }

  // loadBooks = () => {
  //   API.getBooks()
  //     .then(res => {
  //       console.log(res.data);
  //       this.setState({
  //         books: res.data,
  //         title: "",
  //         authors: ""
  //       });
  //     })
  //     .catch(err => console.log(err));
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  addBook = position => {
    // console.log(event);
    console.log(position);
    // event.preventDefault();
    console.log(this.state.books[position]);
    // const test = {
    API.saveBook({
      title: this.state.books[position].title,
      authors: this.state.books[position].authors,
      description: this.state.books[position].description,
      image: this.state.books[position].image,
      link: this.state.books[position].link
      // };
      // console.log(test);
    })
      .then(res => {
        console.log(res);
        alert("book successfully saved");
      })
      .catch(err => console.log(err));
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
    event.preventDefault(); //could add the option to search by author, need to see how that affects the response object
    console.log(this.state.title);
    console.log(this.state.authors);
    // var testQuery = "";
    // if (this.state.title) {
    //   testQuery += "intitle:" + this.state.title.replace(/\s/g, "+");
    // }
    // if (this.state.title && this.state.author) {
    //   testQuery += "&";
    // }
    // else if (this.state.authors) {
    //   testQuery += "inauthor:" + this.state.title.replace(/\s/g, "+");
    // }
    // console.log(testQuery);
    const fixedTitle = "intitle:" + this.state.title.replace(/\s/g, "+");
    API.getGoogleBooks(fixedTitle)
      .then(res => {
        // console.log(
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
          //removed due to issues with it being undefined. might bring it back and do a loop for the joins later
          // superArr[i].categories =
          //   res.data[i].volumeInfo.categories || "data not provided";
          superArr[i].description =
            res.data[i].volumeInfo.description || "data not provided";
          // if (res.data[i].volumeInfo.imageLinks) {
          //   superArr[i].image = res.data[i].volumeInfo.imageLinks.thumbnail;
          // } else {
          //   superArr[i].image = "data not provided";
          // }
          try {
            superArr[i].image = res.data[i].volumeInfo.imageLinks.thumbnail;
          } catch {
            superArr[i].image = "/";
          }
          superArr[i].link =
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
        //
        // const test = { ...superArr };
        // console.log(test);
        //
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
          {/* <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="description (Optional)"
              /> */}
          <FormBtn
            // disabled={!(this.state.authors && this.state.title)}
            onClick={this.handleFormSubmit}
          >
            Submit Book
          </FormBtn>
        </form>
        {this.state.books.length ? (
          <List>
            {this.state.books.map(book => (
              <ListItem key={book.tempId}>
                <div>
                  {/* <Link to={"/books/saved/" + book._id}> */}
                  <strong>
                    <a href={book.link}>
                      {book.title} by {book.authors}
                    </a>
                  </strong>
                  {/* </Link> */}
                </div>
                <img src={book.image} alt={book.title}></img>
                <p>{book.description}</p>
                {/* <DeleteBtn onClick={() => this.deleteBook(book._id)} /> */}
                {/* {book.clicked ? (
                      <SaveBtn
                        className="btn btn-success"
                        id={book.tempId}
                        // onClick={() => this.setState({ selected: book.tempId })}
                        onClick={() => this.addBook(book.tempId)}
                      />
                    ) : (
                      <SaveBtn
                        className="btn btn-danger"
                        id={book.tempId}
                        // onClick={() => this.setState({ selected: book.tempId })}
                        onClick={() => this.addBook(book.tempId)}
                      />
                    )} */}
                <SaveBtn
                  id={book.tempId}
                  // onClick={() => this.setState({ selected: book.tempId })}
                  onClick={() => this.addBook(book.tempId)}
                />
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
