import { LibrarySystem } from "../interfaces/LibrarySystem";
import { Book } from "../interfaces/Book";
import { Reader } from "../interfaces/Reader";

export class LibrarySystemImpl implements LibrarySystem {
  constructor(private books: Book[], private readers: Reader[]) {}

  addBook(book: Book) {
    if (this.books.find((b) => b.getId() === book.getId()))
      throw new Error(`Книга з ID ${book.getId()} вже існує`);
    this.books.push(book);
  }

  registerReader(reader: Reader) {
    if (!reader.getName() || !reader.getContact())
      throw new Error(`Ім'я та контакт читача обов'язкові`);
    this.readers.push(reader);
  }

  // lendBook:
  // - bookId існує
  // - readerId існує
  // - книга доступна
  // - читач ще не брав книгу
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
