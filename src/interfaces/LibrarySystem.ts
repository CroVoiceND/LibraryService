import { Book } from "./Book";
import { Reader } from "./Reader";

export interface LibrarySystem {
  addBook(book: Book): void;
  registerReader(reader: Reader): void;
  lendBook(bookTitle: string, readerName: string): void;
  returnBook(bookTitle: string, readerName: string): void;
  findBooksByAuthor(author: string): Book[];
}
