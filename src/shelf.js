import React, { Component } from 'react'
import PropTypes from 'prop-types'
import BooksGrid from './booksgrid'

class Shelf extends Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    onUpdateShelves: PropTypes.func.isRequired
  };
  render(){
    const {shelf, books, onUpdateShelves} = this.props;
    const showingBooks = books.length && books.filter((b) => b.shelf === shelf.apiName);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.naturalName}</h2>
            <div className="bookshelf-books">
                <BooksGrid showingBooks={showingBooks} onUpdateShelves={() => {
                    onUpdateShelves()}}/>
            </div>
        </div>
    )
  }
}

export default Shelf
