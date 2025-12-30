import { describe, it, expect } from "vitest";
import { BookImpl } from "../src/models/BookImpl";

describe("BookImpl", () => {
  it("should be available by default", () => {
    const book = new BookImpl(1, "TS", "Author", 2023);
    expect(book.isAvailable()).toBe(true);
  });

  it("should change availability status", () => {
    const book = new BookImpl(2, "JS", "Author", 2022);
    book.setAvailable(false);
    expect(book.isAvailable()).toBe(false);
  });
});
