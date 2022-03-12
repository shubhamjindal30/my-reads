import { update } from '../BooksAPI';

const Book = (props) => {
  const { authors, imageLinks, shelf, title, id } = props.book;

  const handleChange = async (e) => {
    const newShelf = e.target.value;
    const res = await update(props.book, newShelf);
    if (res) {
      const updatedBooks = [...props.allBooks];
      const index = updatedBooks.findIndex(book => book.id === id);
      updatedBooks[index].shelf = newShelf;
      props.setBooks(updatedBooks);
    }
  };

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url("${imageLinks?.thumbnail || imageLinks?.smallThumbnail || ''}")`
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={shelf || 'none'} onChange={handleChange}>
              <option disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors?.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;
