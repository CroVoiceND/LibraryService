import { LibrarySystem } from "../interfaces/LibrarySystem";
import { Book } from "../interfaces/Book";
import { Reader } from "../interfaces/Reader";

export class LibrarySystemImpl implements LibrarySystem {
  constructor(private books: Book[], private readers: Reader[]) {}

  // Required test data sets:
  // 1) book.id = unique (e.g. 10), title ≠ "", author ≠ "" → book is successfully added
  // 2) book.id = existing (e.g. 1) → error "Book already exists"
  addBook(book: Book) {
    if (this.books.find((b) => b.getId() === book.getId()))
      throw new Error(`Книга з ID ${book.getId()} вже існує`);
    this.books.push(book);
  }

  // Required test data sets:
  // 1) reader.name = "Ivan", reader.contact = "12345" → reader is successfully registered
  // 2) reader.name = "", reader.contact = "12345" → error
  // 3) reader.name = "Ivan", reader.contact = "" → error
  registerReader(reader: Reader) {
    if (!reader.getName() || !reader.getContact())
      throw new Error(`Ім'я та контакт читача обов'язкові`);
    this.readers.push(reader);
  }

  // Required test data sets:
  // 1) bookId = existing, readerId = existing, book.available = true → book is lent
  // 2) bookId = non-existing → error "Book not found"
  // 3) readerId = non-existing → error "Reader not found"
  // 4) book.available = false → error "Book already lent"
  // 5) reader.borrowedBooks contains bookId → error
  lendBook(bookId: number, readerId: number) {
    const book = this.books.find((b) => b.getId() === bookId);
    if (!book) throw new Error(`Книга з ID ${bookId} не знайдена`);

    const reader = this.readers.find((r) => r.getId() === readerId);
    if (!reader) throw new Error(`Читач з ID ${readerId} не знайдений`);

    if (!book.isAvailable())
      throw new Error(`Книга "${book.getTitle()}" вже видана`);

    if (reader.getBorrowedBooks().find((b) => b.getId() === bookId))
      throw new Error(`Читач "${reader.getName()}" вже взяв цю книгу`);

    book.setAvailable(false);
    reader.borrowBook(book);
  }

  // Required test data sets:
  // 1) bookId ∈ reader.borrowedBooks → book is successfully returned
  // 2) bookId ∉ reader.borrowedBooks → error
  returnBook(bookId: number, readerId: number) {
    const book = this.books.find((b) => b.getId() === bookId);
    if (!book) throw new Error(`Книга з ID ${bookId} не знайдена`);

    const reader = this.readers.find((r) => r.getId() === readerId);
    if (!reader) throw new Error(`Читач з ID ${readerId} не знайдений`);

    if (!reader.getBorrowedBooks().find((b) => b.getId() === bookId))
      throw new Error(
        `Читач "${reader.getName()}" не брав книгу "${book.getTitle()}"`
      );

    book.setAvailable(true);
    reader.returnBook(bookId);
  }

  listBooks(): Book[] {
    return this.books;
  }
  listReaders(): Reader[] {
    return this.readers;
  }
}
