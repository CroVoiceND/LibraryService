import { Reader } from "../interfaces/Reader";
import { Book } from "../interfaces/Book";

export class ReaderImpl implements Reader {
  private borrowedBooks: Book[] = [];

  constructor(
    private name: string,
    private address: string,
    private contact: string
  ) {}

  getName(): string {
    return this.name;
  }

  getAddress(): string {
    return this.address;
  }

  getContact(): string {
    return this.contact;
  }

  getBorrowedBooks(): Book[] {
    return this.borrowedBooks;
  }

  borrowBook(book: Book): void {
    this.borrowedBooks.push(book);
  }

  returnBook(book: Book): void {
    this.borrowedBooks = this.borrowedBooks.filter(b => b !== book);
  }
}
