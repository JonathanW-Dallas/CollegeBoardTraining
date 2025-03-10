function displayList(groceryList) {
    console.log("\nGrocery List:");
    if (groceryList.length === 0) {
      console.log("No items in the list.");
    } else {
      groceryList.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: $${item.price.toFixed(2)}, Bought: ${item.bought ? 'Bought' : 'Not Bought'}`);
      });
    }
  }
  
  module.exports = { displayList };
  