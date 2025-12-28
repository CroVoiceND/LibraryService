import { LibrarySystem } from "../interfaces/LibrarySystem";
import { Book } from "../interfaces/Book";
import { Reader } from "../interfaces/Reader";

export class LibrarySystemImpl implements LibrarySystem {
  constructor(
    private books: Book[],
    private readers: Reader[]
  ) {}

  addBook(book: Book) {
    if (this.books.find(b => b.getId() === book.getId()))
      throw new Error("Книга вже існує");
    this.books.push(book);
  }

  registerReader(reader: Reader) {
    this.readers.push(reader);
  }

  lendBook(bookId: number, readerId: number) {
    const book = this.books.find(b => b.getId() === bookId);
    const reader = this.readers.find(r => r.getId() === readerId);

    if (!book || !reader) throw new Error("Книга або читач не знайдені");
    if (!book.isAvailable()) throw new Error("Книга вже видана");

    book.setAvailable(false);
    reader.borrowBook(book);
  }

  returnBook(bookId: number, readerId: number) {
    const book = this.books.find(b => b.getId() === bookId);
    const reader = this.readers.find(r => r.getId() === readerId);

    if (!book || !reader) throw new Error("Помилка повернення");

    book.setAvailable(true);
    reader.returnBook(bookId);
  }

  listBooks() { return this.books; }
  listReaders() { return this.readers; }
}
