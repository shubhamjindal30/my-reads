import { update } from "../BooksAPI";

const Book = (props) => {
  const { authors, imageLinks, shelf, title } = props.book;

  const handleChange = async (e) => {
    await update(props.book, e.target.value);
    props.onUpdate();
  }

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
              <option value="none" disabled>
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
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    </li>
  );
};

export default Book;
