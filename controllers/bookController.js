const Book = require('../models/bookModel');

const { getPostData } = require('../utils/utils');

// @desc Gets ALL books
// @route GET /api/books
async function getBooks(req, res) {
  try {
    const books = await Book.findAll();

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(books));
  } catch (err) {
    console.log(err);
  }
}

// @desc Gets single book
// @route GET /api/book/:id
async function getBook(req, res, id) {
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Book Not Found' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(book));
    }
  } catch (err) {
    console.log(err);
  }
}

// @desc Create a Book
// @route POST /api/books
async function createBook(req, res) {
  try {
    const body = await getPostData(req);

    const { title, author, price, pages, ages } = JSON.parse(body);

    const book = {
      title,
      author,
      price,
      pages,
      ages,
    };

    const newBook = await Book.create(book);

    res.writeHead(201, {
      'Content-Type': 'application/json',
    });
    return res.end(JSON.stringify(newBook));
  } catch (err) {
    console.log(err);
  }
}

// @desc UPDATE a Book
// @route PUT /api/books/:id
async function updateBook(req, res, id) {
  try {
    const book = await Book.findById(id);
    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Book Not Found' }));
    } else {
      const body = await getPostData(req);

      const { title, author, price, pages, ages } = JSON.parse(body);

      const bookData = {
        title: title || book.title,
        author: author || book.author,
        price: price || book.price,
        pages: pages || book.pages,
        ages: ages || book.ages,
      };

      const updatedBook = await Book.update(id, bookData);

      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      return res.end(JSON.stringify(updatedBook));
    }
  } catch (err) {
    console.log(err);
  }
}

// @desc Deletes single book
// @route DELETE /api/book/:id
async function deleteBook(req, res, id) {
  try {
    const book = await Book.findById(id);

    if (!book) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'Book Not Found' }));
    } else {
      await Book.remove(id);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(
        JSON.stringify({
          message: `Book ${book.id} ${book.title} Deleted`,
        })
      );
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
};
