import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './booksgrid';

class Shelf extends Component {
    static propTypes = {
        shelf: PropTypes.object.isRequired,
        books: PropTypes.array.isRequired,
        onUpdateShelves: PropTypes.func.isRequired
    };

    onUpdateShelves() {
        this.props.onUpdateShelves(this.props.books)
    }

    render() {
        const {shelf, books} = this.props;
        const showingBooks = (books && books.length) ? books.filter((b) => b.shelf === shelf.apiName) : [];
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.naturalName}</h2>
                <div className="bookshelf-books">
                    <BooksGrid
                        showingBooks={showingBooks}
                        onUpdateShelves={(books) => { this.onUpdateShelves(books) }}
                    />
                </div>
            </div>
        );
    }
}

export default Shelf;
