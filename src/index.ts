import * as readline from "readline";
import { books, readers } from "./data/mockDB";
import { LibrarySystemImpl } from "./system/LibrarySystemImpl";
import { BookImpl } from "./models/BookImpl";
import { ReaderImpl } from "./models/ReaderImpl";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const system = new LibrarySystemImpl(books, readers);

function menu() {
  console.log(`
1. Показати книги
2. Показати читачів
3. Видати книгу
4. Повернути книгу
5. Додати книгу
6. Зареєструвати читача
0. Вийти
`);

  rl.question("Ваш вибір: ", (answer) => {
    try {
      switch (answer) {
        case "1":
          system
            .listBooks()
            .forEach((b) =>
              console.log(
                `${b.getId()} | ${b.getTitle()} | ${
                  b.isAvailable() ? "Доступна" : "Видана"
                }`
              )
            );
          break;
        case "2":
          system
            .listReaders()
            .forEach((r) => console.log(`${r.getId()} | ${r.getName()}`));
          break;
        case "3":
          rl.question("ID книги: ", (b) =>
            rl.question("ID читача: ", (r) => {
              system.lendBook(+b, +r);
              menu();
            })
          );
          return;
        case "4":
          rl.question("ID книги: ", (b) =>
            rl.question("ID читача: ", (r) => {
              system.returnBook(+b, +r);
              menu();
            })
          );
          return;
        case "5":
          rl.question("Назва книги: ", (title) =>
            rl.question("Автор: ", (author) =>
              rl.question("Рік видання: ", (year) => {
                const newId = system.listBooks().length + 1;
                system.addBook(new BookImpl(newId, title, author, +year));
                console.log("✅ Книга додана");
                menu();
              })
            )
          );
          return;
        case "6":
          rl.question("Ім'я читача: ", (name) =>
            rl.question("Адреса: ", (address) =>
              rl.question("Контакт: ", (contact) => {
                const newId = system.listReaders().length + 1;
                system.registerReader(
                  new ReaderImpl(newId, name, address, contact)
                );
                console.log("✅ Читач зареєстрований");
                menu();
              })
            )
          );
          return;

        case "0":
          rl.close();
          return;
      }
    } catch (e: any) {
      console.error("❌", e.message);
    }
    menu();
  });
}

menu();
