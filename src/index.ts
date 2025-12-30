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
===== Система керування бібліотекою =====
1. Показати книги
2. Показати читачів
3. Видати книгу
4. Повернути книгу
5. Додати книгу
6. Зареєструвати читача
7. Пошук книги
0. Вийти
=======================================
`);
  rl.question("Ваш вибір: ", (answer) => {
    switch (answer) {
      case "1":
        system
          .listBooks()
          .forEach((b) =>
            console.log(
              `${b.getId()} | ${b.getTitle()} | ${b.getAuthor()} | ${b.getYear()} | ${
                b.isAvailable() ? "Доступна" : "Видана"
              }`
            )
          );
        break;

      case "2":
        system
          .listReaders()
          .forEach((r) =>
            console.log(
              `${r.getId()} | ${r.getName()} | ${r.getAddress()} | ${r.getContact()}`
            )
          );
        break;

      case "3":
        rl.question("ID книги: ", (bId) =>
          rl.question("ID читача: ", (rId) => {
            try {
              system.lendBook(+bId, +rId);
              console.log("✅ Книга видана");
            } catch (e: any) {
              console.error("❌", e.message);
            }
            menu();
          })
        );
        return;

      case "4":
        rl.question("ID книги: ", (bId) =>
          rl.question("ID читача: ", (rId) => {
            try {
              system.returnBook(+bId, +rId);
              console.log("✅ Книга повернена");
            } catch (e: any) {
              console.error("❌", e.message);
            }
            menu();
          })
        );
        return;

      case "5":
        rl.question("Назва книги: ", (title) =>
          rl.question("Автор: ", (author) =>
            rl.question("Рік видання: ", (year) => {
              try {
                const newId = system.listBooks().length;
                system.addBook(new BookImpl(newId, title, author, +year));
                console.log("✅ Книга додана");
              } catch (e: any) {
                console.error("❌", e.message);
              }
              menu();
            })
          )
        );
        return;

      case "6":
        rl.question("Ім'я читача: ", (name) =>
          rl.question("Адреса: ", (address) =>
            rl.question("Контакт: ", (contact) => {
              try {
                const newId = system.listReaders().length + 1;
                system.registerReader(
                  new ReaderImpl(newId, name, address, contact)
                );
                console.log("✅ Читач зареєстрований");
              } catch (e: any) {
                console.error("❌", e.message);
              }
              menu();
            })
          )
        );
        return;

      case "7":
        rl.question("Критерій пошуку (title/author/year): ", (criterion) =>
          rl.question("Значення: ", (value) => {
            let results = [];
            switch (criterion.toLowerCase()) {
              case "title":
                results = system
                  .listBooks()
                  .filter((b) =>
                    b.getTitle().toLowerCase().includes(value.toLowerCase())
                  );
                break;
              case "author":
                results = system
                  .listBooks()
                  .filter((b) =>
                    b.getAuthor().toLowerCase().includes(value.toLowerCase())
                  );
                break;
              case "year":
                results = system
                  .listBooks()
                  .filter((b) => b.getYear() === +value);
                break;
              default:
                console.log("❌ Невідомий критерій");
                menu();
                return;
            }

            if (results.length === 0) console.log("Книга не знайдена");
            else
              results.forEach((b) =>
                console.log(
                  `${b.getId()} | ${b.getTitle()} | ${b.getAuthor()} | ${b.getYear()} | ${
                    b.isAvailable() ? "Доступна" : "Видана"
                  }`
                )
              );
            menu();
          })
        );
        return;

      case "0":
        rl.close();
        return;

      default:
        console.log("❌ Невірний вибір. Спробуйте ще раз.");
    }

    menu();
  });
}

menu();
