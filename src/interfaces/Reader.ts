import { Book } from "./Book";

export interface Reader {
  getId(): number;
  getName(): string;
  getAddress(): string;
  getContact(): string;
  getBorrowedBooks(): Book[];
  borrowBook(book: Book): void;
  returnBook(bookId: number): void;
}
