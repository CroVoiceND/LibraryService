export interface Book {
  getId(): number;
  getTitle(): string;
  getAuthor(): string;
  getYear(): number;
  isAvailable(): boolean;
  setAvailable(status: boolean): void;
}
