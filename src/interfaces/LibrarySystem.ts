import { Book } from "./Book";
import { Reader } from "./Reader";

export interface LibrarySystem {
  addBook(book: Book): void;
  registerReader(reader: Reader): void;
  lendBook(bookId: number, readerId: number): void;
  returnBook(bookId: number, readerId: number): void;
  listBooks(): Book[];
  listReaders(): Reader[];
}
