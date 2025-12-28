import * as readline from "readline";
import { books, readers } from "./data/mockDB";
import { LibrarySystemImpl } from "./system/LibrarySystemImpl";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const system = new LibrarySystemImpl(books, readers);

function menu() {
  console.log(`
1. Показати книги
2. Показати читачів
3. Видати книгу
4. Повернути книгу
0. Вийти
`);
  rl.question("Ваш вибір: ", answer => {
    try {
      switch (answer) {
        case "1":
          system.listBooks().forEach(b =>
            console.log(`${b.getId()} | ${b.getTitle()} | ${b.isAvailable() ? "Доступна" : "Видана"}`)
          );
          break;
        case "2":
          system.listReaders().forEach(r =>
            console.log(`${r.getId()} | ${r.getName()}`)
          );
          break;
        case "3":
          rl.question("ID книги: ", b =>
            rl.question("ID читача: ", r => {
              system.lendBook(+b, +r);
              menu();
            })
          );
          return;
        case "4":
          rl.question("ID книги: ", b =>
            rl.question("ID читача: ", r => {
              system.returnBook(+b, +r);
              menu();
            })
          );
          return;
        case "0":
          rl.close();
          return;
      }
    } catch (e:any) {
      console.error("❌", e.message);
    }
    menu();
  });
}

menu();
