import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAll } from '../BooksAPI';
import Shelf from '../components/Shelf';

const shelves = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

const BooksPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const res = await getAll();
      setBooks(res);
    };

    getBooks();
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {Object.keys(shelves).map((shelf) => (
            <Shelf
              key={shelf}
              shelfTitle={shelves[shelf]}
              books={books.filter((x) => x.shelf === shelf)}
              allBooks={books}
              setBooks={setBooks}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BooksPage;
