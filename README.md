# React-Book-Search

<a href="https://github.com/LVerane/React-Book-Search"><strong>Documentation and Repo Link</strong></a>

## Getting Started

On the console, type 'npm install' and press enter

## Getting Started

Simply visit (https://react-book-search-2.herokuapp.com/)

If you want to get your hands on the code simply look at the following section [Installation](#installation)

### Installation

1. Clone the repo

```sh
git clone https://github.com/LVerane/React-Book-Search.git
```

2. Install NPM packages

```sh
npm install
```

3. Create an .env for your Google API key

4. Connect to your local mongoDB database

```sh
mongod
```

If you don't have mongoDB installed, get it for [Windows](https://treehouse.github.io/installation-guides/windows/mongo-windows.html) or [Mac](https://treehouse.github.io/installation-guides/mac/mongo-mac.html)

5. Dig in.

## Main Page

The user may search for a book by its title. The search will be made to Google Books API and will return 10 books that contain the search parameter on its title.\
Each book displayed will have title, author(s), description, picture and a link to the corresponding Google Books page.\
For each search result the user may click the "View" button, which will redirect them to the Google Books Page.\
For each search result the user may click the "Save" button, which will add it to the database. Saved books can be found in the Saved page.

## Saved Page

Displays all the books saved in the database.\
Each book displayed will have title, author(s), description, picture and a link to the corresponding Google Books page.\
For each book the user may click the "View" button, which will redirect them to the Google Books Page.\
For each book the user may click the "Delete" button, which will remove it from the database.

## NoMatch Page

If the user tries to go to a page that doesn't exist on the website they will be redirected here.
