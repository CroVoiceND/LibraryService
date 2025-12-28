import { LibrarySystem } from "../interfaces/LibrarySystem";
import { Book } from "../interfaces/Book";
import { Reader } from "../interfaces/Reader";

export class LibrarySystemImpl implements LibrarySystem {
  private books: Book[] = [];
  private readers: Reader[] = [];

  addBook(book: Book): void {
    if (this.books.find(b => b.getTitle() === book.getTitle())) {
      throw new Error("Книга вже існує в бібліотеці");
    }
    this.books.push(book);
  }

  registerReader(reader: Reader): void {
    this.readers.push(reader);
  }

  lendBook(bookTitle: string, readerName: string): void {
    const book = this.books.find(b => b.getTitle() === bookTitle);
    const reader = this.readers.find(r => r.getName() === readerName);

    if (!book || !reader) {
      throw new Error("Книга або читач не знайдені");
    }
    if (!book.isAvailable()) {
      throw new Error("Книга вже видана");
    }

    book.setAvailable(false);
    reader.borrowBook(book);
  }

  returnBook(bookTitle: string, readerName: string): void {
    const book = this.books.find(b => b.getTitle() === bookTitle);
    const reader = this.readers.find(r => r.getName() === readerName);

    if (!book || !reader) {
      throw new Error("Помилка повернення книги");
    }

    book.setAvailable(true);
    reader.returnBook(book);
  }

  findBooksByAuthor(author: string): Book[] {
    return this.books.filter(b => b.getAuthor() === author);
  }
}
