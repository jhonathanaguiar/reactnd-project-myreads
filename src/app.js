import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './app.css';
import ListShelves from './listshelves';
import Search from './search';
import * as BooksAPI from "./booksapi";


class BooksApp extends Component {
    state = {
        books: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            if(books.length){
                books = books.filter((book) => (book.imageLinks && book.imageLinks.thumbnail && book.title && book.authors && book.authors.length));
                this.setState({books})
            }
        });
    }

    onUpdateShelves(books) {
        this.setState({books})
    }

    addBookToShelf(book) {
        if(this.state.books.indexOf(book) === -1){
            this.setState({books: this.state.books.concat(book)});
        } else {
            this.onUpdateShelves()
        }
    }

    render() {
        let {books} = this.state;
        return (
            <div className="app">
                <Route path="/search" render={() => (
                    <Search
                        books={books}
                        addBookToShelf={book => this.addBookToShelf(book)}
                        onUpdateShelves={(books) => this.onUpdateShelves(books)}
                    />
                )}/>
                <Route exact path="/" render={() => (
                    <ListShelves
                        books={books}
                        onUpdateShelves={(books) => this.onUpdateShelves(books)}
                    />
                )}/>
            </div>
        );
    }
}

export default BooksApp;
