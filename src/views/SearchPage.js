import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getAll, search } from '../BooksAPI';
import Book from '../components/Book';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [myBooks, setMyBooks] = useState({});

  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll();
      const obj = {};
      res.forEach((book) => {
        obj[book.id] = book.shelf;
      });
      setMyBooks(obj);
    };

    getBooks();
  }, []);

  useEffect(() => {
    const getSearchResults = async () => {
      const res = await search(query);
      if (!res.error) setBooks(res);
      else setBooks([]);
    };

    if (query) getSearchResults();
    else setBooks([]);
  }, [query]);

  const handleSearch = (e) => setQuery(e.target.value);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books
            .filter((book) => !!book.imageLinks)
            .map((bookObj) => {
              const book = { ...bookObj };
              book.shelf = myBooks[bookObj.id] || '';
              return <Book key={book.id} book={book} setBooks={setBooks} allBooks={books} />;
            })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;
