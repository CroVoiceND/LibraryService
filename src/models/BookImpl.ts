import { Book } from "../interfaces/Book";

export class BookImpl implements Book {
  constructor(
    private title: string,
    private author: string,
    private year: number,
    private available: boolean = true
  ) {}

  getTitle(): string {
    return this.title;
  }

  getAuthor(): string {
    return this.author;
  }

  getYear(): number {
    return this.year;
  }

  isAvailable(): boolean {
    return this.available;
  }

  setAvailable(status: boolean): void {
    this.available = status;
  }
}
