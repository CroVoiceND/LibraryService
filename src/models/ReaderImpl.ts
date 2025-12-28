import { Reader } from "../interfaces/Reader";
import { Book } from "../interfaces/Book";

export class ReaderImpl implements Reader {
  private borrowedBooks: Book[] = [];

  constructor(
    private id: number,
    private name: string,
    private address: string,
    private contact: string
  ) {}

  getId() { return this.id; }
  getName() { return this.name; }
  getAddress() { return this.address; }
  getContact() { return this.contact; }
  getBorrowedBooks() { return this.borrowedBooks; }

  borrowBook(book: Book) {
    this.borrowedBooks.push(book);
  }

  returnBook(bookId: number) {
    this.borrowedBooks = this.borrowedBooks.filter(b => b.getId() !== bookId);
  }
}
