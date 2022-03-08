import { useEffect, useState } from 'react';

import './App.css';
import { getAll } from './BooksAPI';
import Shelf from './components/Shelf';

const shelves = {
  currentlyReading: 'Currently Reading',
  wantToRead: 'Want to Read',
  read: 'Read'
};

const App = () => {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [books, setBooks] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: []
  });

  useEffect(() => {
    const func = async () => {
      const res = await getAll();
      const current = res.filter((x) => x.shelf === 'currentlyReading');
      const want = res.filter((x) => x.shelf === 'wantToRead');
      const read = res.filter((x) => x.shelf === 'read');
      setBooks({
        currentlyReading: current || [],
        wantToRead: want || [],
        read: read || []
      });
    };
    func();
  }, []);

  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a className="close-search" onClick={() => setShowSearchpage(!showSearchPage)}>
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title, author, or ISBN" />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {Object.keys(shelves).map((shelf) => (
                <Shelf key={shelf} shelfTitle={shelves[shelf]} books={books[shelf]} />
              ))}
            </div>
          </div>
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
