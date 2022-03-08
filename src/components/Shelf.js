import Book from './Book';

const Shelf = (props) => {
  const { shelfTitle, books } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((book) => <Book key={book.id} book={book} />)}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
