import { Book } from "./Book";

export interface Reader {
  getName(): string;
  getAddress(): string;
  getContact(): string;
  getBorrowedBooks(): Book[];
  borrowBook(book: Book): void;
  returnBook(book: Book): void;
}
