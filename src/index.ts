import { LibrarySystemImpl } from "./system/LibrarySystemImpl";
import { BookImpl } from "./models/BookImpl";
import { ReaderImpl } from "./models/ReaderImpl";

const library = new LibrarySystemImpl();

const book1 = new BookImpl("Clean Code", "Robert Martin", 2008);
const reader1 = new ReaderImpl("Іван Петренко", "Київ", "+380991112233");

library.addBook(book1);
library.registerReader(reader1);

library.lendBook("Clean Code", "Іван Петренко");
library.returnBook("Clean Code", "Іван Петренко");

console.log("Система працює коректно");
