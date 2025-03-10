// Import the readline module for handling user input in the console
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, // Read from keyboard
  output: process.stdout // Write to console
});

let groceryList = []; // Array to store grocery items

// Function to display grocery list
function displayList() {
  console.log("\nGrocery List:");
  if (groceryList.length === 0) {
    console.log("No items in the list.");
  } else {
    groceryList.forEach((item, index) => {
      console.log(`${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}, Bought: ${item.bought ? 'Bought' : 'Not Bought'}`);
    });
  }
}

// Function to add an item
function addItem() {
  rl.question("Enter item name: ", (name) => {
    rl.question("Enter quantity: ", (quantity) => {
      rl.question("Enter price: ", (price) => {
        groceryList.push({ name, quantity: parseInt(quantity), price: parseFloat(price), bought: false });
        console.log(`\nItem '${name}' added to the grocery list.`);
        displayList();
        setImmediate(showMenu);
      });
    });
  });
}

// Function to remove an item
function removeItem() {
  displayList();
  rl.question("Enter the number of the item to remove: ", (num) => {
    const index = parseInt(num.trim(), 10) - 1;
    if (!isNaN(index) && index >= 0 && index < groceryList.length) {
      console.log(`\nItem '${groceryList[index].name}' removed from the grocery list.`);
      groceryList.splice(index, 1);
    } else {
      console.log("Invalid selection.");
    }
    displayList();
    setImmediate(showMenu);
  });
}

// Function to mark an item as bought
function markAsBought() {
  displayList();
  rl.question("Enter the number of the item to mark as bought: ", (num) => {
    const index = parseInt(num.trim(), 10) - 1;
    if (!isNaN(index) && index >= 0 && index < groceryList.length) {
      groceryList[index].bought = true;
      console.log(`\nItem '${groceryList[index].name}' marked as bought.`);
    } else {
      console.log("Invalid selection.");
    }
    displayList();
    setImmediate(showMenu);
  });
}

// Function to display the menu
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
        displayList();
        setImmediate(showMenu);
        break;
      case "2":
        addItem();
        break;
      case "3":
        removeItem();
        break;
      case "4":
        markAsBought();
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
