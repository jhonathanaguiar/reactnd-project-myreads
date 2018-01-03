import React, {Component} from 'react';
import * as BooksAPI from "./booksapi";
import PropTypes from "prop-types";

class BookGrid extends Component {
    static propTypes = {
        showingBooks: PropTypes.array.isRequired
    };

    handleChange = (book, e) => {
        const previouslyShelf = book.shelf;
        book.shelf = e.target.value;
        if(previouslyShelf === 'none' && previouslyShelf !== book.shelf){
            this.props.addBookToShelf(book)
        } else if(this.props.onUpdateShelves) {
            this.props.onUpdateShelves();
        } else if(book.shelfIndex) {
            this.props.refreshBookShelves(book)
        }
        BooksAPI.update(book, e.target.value).then(() => {
            //Não esperei uma resposta do servidor para que a demora no retorno não atrapalhasse a experiência de usuário
        });
    };

    render() {
        const {showingBooks} = this.props;
        return (
            <ol className="books-grid">
                {showingBooks.length && showingBooks.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{
                                    width: 128,
                                    height: 193,
                                    backgroundImage: `url("${book.imageLinks.thumbnail}")`
                                }}> </div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf} onChange={(e) => this.handleChange(book, e)}>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.map((author) => (`${author}, `))}</div>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default BookGrid;