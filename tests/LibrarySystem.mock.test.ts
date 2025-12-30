import { describe, it, expect, vi } from "vitest";
import { Book } from "../src/interfaces/Book";
import { Reader } from "../src/interfaces/Reader";
import { LibrarySystemImpl } from "../src/system/LibrarySystemImpl";

describe("LibrarySystemImpl with mocks", () => {
  it("should lend book to reader", () => {
    const mockBook: Book = {
      getId: vi.fn(() => 1),
      getTitle: vi.fn(() => "TS"),
      isAvailable: vi.fn(() => true),
      setAvailable: vi.fn(),
      getAuthor: function (): string {
        throw new Error("Function not implemented.");
      },
      getYear: function (): number {
        throw new Error("Function not implemented.");
      },
    };

    const mockReader: Reader = {
      getId: vi.fn(() => 1),
      getName: vi.fn(() => "Іван"),
      getBorrowedBooks: vi.fn(() => []),
      borrowBook: vi.fn(),
      returnBook: vi.fn(),
      getAddress: function (): string {
        throw new Error("Function not implemented.");
      },
      getContact: function (): string {
        throw new Error("Function not implemented.");
      },
    };

    const system = new LibrarySystemImpl([mockBook], [mockReader]);

    system.lendBook(1, 1);

    expect(mockBook.setAvailable).toHaveBeenCalledWith(false);
    expect(mockReader.borrowBook).toHaveBeenCalled();
  });
});
