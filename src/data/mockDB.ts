import { BookImpl } from "../models/BookImpl";
import { ReaderImpl } from "../models/ReaderImpl";

export const books = [
  new BookImpl(1, "1984", "George Orwell", 1949),
  new BookImpl(2, "Clean Code", "Robert Martin", 2008),
  new BookImpl(3, "The Pragmatic Programmer", "Andrew Hunt", 1999),
];

export const readers = [
  new ReaderImpl(1, "Іван Петренко", "Харків", "ivan@gmail.com"),
  new ReaderImpl(2, "Олена Коваль", "Київ", "olena@gmail.com"),
];
