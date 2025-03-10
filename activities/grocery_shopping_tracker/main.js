const readline = require('readline');
const { addItem, removeItem, markAsBought, getGroceryList } = require('./groceryList');
const { displayList } = require('./utils');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function showMenu() {
  console.log("\n--- Grocery Shopping Tracker ---");
  console.log("1. View Grocery List");
  console.log("2. Add an Item");
  console.log("3. Remove an Item");
  console.log("4. Mark an Item as Bought");
  console.log("5. Exit");

  rl.question("Select an option: ", (option) => {
    const selectedOption = option.trim();

    switch (selectedOption) {
      case "1":
        displayList(getGroceryList());
        setImmediate(showMenu);
        break;
      case "2":
        rl.question("Enter item name: ", (name) => {
          rl.question("Enter quantity: ", (quantity) => {
            rl.question("Enter price: ", (price) => {
              addItem(name, quantity, price);
              displayList(getGroceryList());
              setImmediate(showMenu);
            });
          });
        });
        break;
      case "3":
        displayList(getGroceryList());
        rl.question("Enter the number of the item to remove: ", (num) => {
          const index = parseInt(num.trim(), 10) - 1;
          removeItem(index);
          displayList(getGroceryList());
          setImmediate(showMenu);
        });
        break;
      case "4":
        displayList(getGroceryList());
        rl.question("Enter the number of the item to mark as bought: ", (num) => {
          const index = parseInt(num.trim(), 10) - 1;
          markAsBought(index);
          displayList(getGroceryList());
          setImmediate(showMenu);
        });
        break;
      case "5":
        console.log("Goodbye!");
        rl.close();
        break;
      default:
        console.log("Invalid option. Please try again.");
        setImmediate(showMenu);
    }
  });
}

// Start the application
console.log("\nWelcome to the Grocery Shopping Tracker!");
showMenu();
