let groceryList = []; // Array to store grocery items

function addItem(name, quantity, price) {
  groceryList.push({ name, quantity: parseInt(quantity), price: parseFloat(price), bought: false });
  console.log(`\nItem '${name}' added to the grocery list.`);
}

function removeItem(index) {
  if (index >= 0 && index < groceryList.length) {
    console.log(`\nItem '${groceryList[index].name}' removed from the grocery list.`);
    groceryList.splice(index, 1);
  } else {
    console.log("Invalid selection.");
  }
}

function markAsBought(index) {
  if (index >= 0 && index < groceryList.length) {
    groceryList[index].bought = true;
    console.log(`\nItem '${groceryList[index].name}' marked as bought.`);
  } else {
    console.log("Invalid selection.");
  }
}

function getGroceryList() {
  return groceryList;
}

module.exports = { addItem, removeItem, markAsBought, getGroceryList };
