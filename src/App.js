import React, { Component } from "react";
import "./App.css";

import Books from "./Books";

class App extends Component {
  state = {
    displayAll: true,
    allBooks: Books
  };

  selectBookHandler = bookToSelect => {
    let bookList = Object.assign([], this.state.allBooks);
    bookList.forEach(function(obj) {
      if (obj.name === bookToSelect) {
        obj.selected = true;
      } else {
        obj.selected = false;
      }
    });
    this.setState({ books: bookList, displayAll: false });
  };

  selectAllBooks = () => {
    let bookList = Object.assign([], this.state.allBooks);
    bookList.forEach(function(obj) {
      obj.selected = false;
    });
    this.setState({ books: bookList, displayAll: true });
  };

  render() {
    let allBooks = this.state.displayAll
      ? this.state.allBooks.map(book => (
          <BookCard
            key={book.name}
            title={book.name}
            year={book.date}
            author={book.author}
            image={book.image}
            selectBook={this.selectBookHandler}
          />
        ))
      : null;

    let selectedBook = this.state.allBooks
      .filter(book => book.selected === true)
      .map(book => (
        <BookSummary
          key={book.name}
          title={book.name}
          year={book.date}
          author={book.author}
          image={book.image}
          description={book.description}
          selectAll={this.selectAllBooks}
        />
      ));

    return (
      <div className="App">
        <header>
          <h1>Top SciFi & Fantasy Books</h1>
        </header>
        <main>
          <nav>
            <p
              className={
                this.state.displayAll === true ? "selected" : "bookNav"
              }
              onClick={() => this.selectAllBooks()}
            >
              View All Books
            </p>
            {this.state.allBooks.map(book => (
              <p
                className={book.selected === true ? "selected" : "bookNav"}
                onClick={() => this.selectBookHandler(book.name)}
                key={book.name}
              >
                {book.name}
              </p>
            ))}
          </nav>
          <article className="display">
            {allBooks}
            {selectedBook}
          </article>
        </main>
      </div>
    );
  }
}

const BookCard = props => {
  return (
    <div className="card" onClick={() => props.selectBook(props.title)}>
      <h3>{props.title}</h3>
      <img src={props.image} alt={props.title} />
      <p>
        {props.author} ({props.year})
      </p>
    </div>
  );
};

const BookSummary = props => {
  return (
    <div className="book-summary">
      <button className="back-button" onClick={() => props.selectAll()}>
        Back to All
      </button>
      <div className="summaryCard">
        <img src={props.image} alt={props.title} />
        <div className="description">
          <h1>{props.title}</h1>
          <p className="book-author">By: {props.author}</p>
          <p className="book-year">Written: {props.year}</p>
          <div className="description-text">{props.description}</div>
        </div>
      </div>
    </div>
  );
};

export default App;
