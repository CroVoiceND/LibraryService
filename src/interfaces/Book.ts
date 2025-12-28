export interface Book {
  getTitle(): string;
  getAuthor(): string;
  getYear(): number;
  isAvailable(): boolean;
  setAvailable(status: boolean): void;
}
