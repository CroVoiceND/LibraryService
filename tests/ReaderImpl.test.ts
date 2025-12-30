import { describe, it, expect } from "vitest";
import { ReaderImpl } from "../src/models/ReaderImpl";
import { BookImpl } from "../src/models/BookImpl";

describe("ReaderImpl", () => {
  it("should borrow a book", () => {
    const reader = new ReaderImpl(1, "Іван", "Київ", "123");
    const book = new BookImpl(1, "TS", "Author", 2023);

    reader.borrowBook(book);

    expect(reader.getBorrowedBooks().length).toBe(1);
    expect(reader.getBorrowedBooks()[0].getTitle()).toBe("TS");
  });

  it("should return a book", () => {
    const reader = new ReaderImpl(2, "Петро", "Львів", "456");
    const book = new BookImpl(2, "JS", "Author", 2022);

    reader.borrowBook(book);
    reader.returnBook(2);

    expect(reader.getBorrowedBooks().length).toBe(0);
  });
});
