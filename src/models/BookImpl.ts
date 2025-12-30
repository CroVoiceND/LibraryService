import { Book } from "../interfaces/Book";

export class BookImpl implements Book {
  constructor(
    private id: number,
    private title: string,
    private author: string,
    private year: number,
    private available: boolean = true
  ) {}

  getId() { return this.id; }
  getTitle() { return this.title; }
  getAuthor() { return this.author; }
  getYear() { return this.year; }
  isAvailable() { return this.available; }
  setAvailable(status: boolean) { this.available = status; }
}
