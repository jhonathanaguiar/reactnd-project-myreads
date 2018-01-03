import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './app.css';
import Shelf from './shelf.js';
import PropTypes from "prop-types";

class ListShelves extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired
    };

    state = {
        shelves: [
            {naturalName: 'Currently Reading', apiName: 'currentlyReading'},
            {naturalName: 'Want to Read', apiName: 'wantToRead'},
            {naturalName: 'Read', apiName: 'read'}]
    };

    render() {
        const {shelves} = this.state;
        const {books, onUpdateShelves} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        {shelves.map((shelf) => (
                                <Shelf key={shelf.apiName}
                                       shelf={shelf}
                                       books={books}
                                       onUpdateShelves={(books) => onUpdateShelves(books)}/>
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
        );
    }
}

export default ListShelves;