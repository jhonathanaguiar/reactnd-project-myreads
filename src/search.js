import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './booksapi';
import './app.css';
import BooksGrid from './booksgrid';

class Search extends Component {

    state = {
        query: '',
        books: []
    };

    refreshBookShelves(book) {
        let books = this.props.books;
        books.splice(book.shelfIndex, 1, book);
        this.props.onUpdateShelves(books)
    }

    updateQuery(e) {
        const self = this;
        if (e) {
            BooksAPI.search(e).then((books) => {
                if(books.length) {
                    books = books.filter((book) => (book.imageLinks && book.title && book.authors));
                    for(let book of books) {
                        const index = this.props.books.findIndex((b) => b.id === book.id);
                        if(index >= 0){
                            book.shelf = self.props.books[index].shelf;
                            book.shelfIndex = index
                        } else {
                            book.shelf = 'none'
                        }
                    }
                    this.setState({books})
                }
            });
        } else {
            this.setState({books: []})
        }

    }

    render() {
        const {books} = this.state;
        const {addBookToShelf} = this.props;
        // if(this.props.books.length > 0 && this.state.books.length === 0){
        //     this.setState({books: this.props.books})
        // }
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text"
                               placeholder="Search by title or author"
                               onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BooksGrid
                            showingBooks={books}
                            addBookToShelf={(book)=> addBookToShelf(book)}
                            refreshBookShelves={(book) => this.refreshBookShelves(book)}
                        />
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search;