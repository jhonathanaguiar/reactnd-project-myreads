import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './shelf.js'

class ListShelves extends Component {
    state = {
        shelves: [
            {naturalName: 'Currently Reading', apiName: 'currentlyReading'},
            {naturalName: 'Want to Read', apiName: 'wantToRead'},
            {naturalName: 'Read', apiName: 'read'}],
        books: []
    };
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }
    updateShelves () {
        this.setState(state => ({
            books: state.books
        }));
    };
    render(){
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {this.state.shelves.map( (shelf) => (
                            <Shelf key={shelf.apiName} shelf={shelf} books={this.state.books} onUpdateShelves={() => {
                                this.updateShelves();
                            }}/>
                            )
                        )}
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/search"
                    >Add a book
                    </Link>
                </div>
            </div>
        )
    }
}

export default ListShelves