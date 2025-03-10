const http = require('http');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DATA_FILE = path.join(__dirname, 'groceries.json');

// Read grocery list from file
function readGroceryList() {
  if (!fs.existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8') || '[]');
  } catch (error) {
    logger.error("Error reading grocery list:", error);
    return [];
  }
}

// Write grocery list to file
function writeGroceryList(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
}

// Create the server
const server = http.createServer((req, res) => {
  const { method, url } = req;
  let body = '';

  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    let groceries = readGroceryList();

    if (url === '/groceries' && method === 'GET') {
      // ✅ View grocery list
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(groceries));
      logger.info('Viewed grocery list');

    } else if (url === '/groceries' && method === 'POST') {
      // ✅ Add new item
      try {
        const newItem = JSON.parse(body);
        if (!newItem.name || typeof newItem.price !== 'number' || typeof newItem.quantity !== 'number') {
          throw new Error("Invalid input data");
        }

        newItem.id = Date.now();
        groceries.push(newItem);
        writeGroceryList(groceries);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item added', item: newItem }));
        logger.info(`Added item: ${newItem.name}`);
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: error.message }));
      }

    } else if (url.startsWith('/groceries/') && method === 'PUT') {
      // ✅ Edit an item
      const id = parseInt(url.split('/')[2], 10);
      if (isNaN(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid ID' }));
        return;
      }

      const updatedItem = JSON.parse(body);
      let itemIndex = groceries.findIndex(item => item.id === id);

      if (itemIndex !== -1) {
        groceries[itemIndex] = { ...groceries[itemIndex], ...updatedItem };
        writeGroceryList(groceries);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item updated', item: groceries[itemIndex] }));
        logger.info(`Updated item: ${groceries[itemIndex].name}`);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item not found' }));
      }

    } else if (url.startsWith('/groceries/') && method === 'DELETE') {
      // ✅ Delete an item
      const id = parseInt(url.split('/')[2], 10);
      if (isNaN(id)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid ID' }));
        return;
      }

      const filteredList = groceries.filter(item => item.id !== id);

      if (groceries.length !== filteredList.length) {
        writeGroceryList(filteredList);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item deleted' }));
        logger.info(`Deleted item with ID: ${id}`);
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Item not found' }));
      }

    } else {
      // ❌ Invalid routes
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Route not found', route: url }));
      logger.warn(`Invalid route accessed: ${url}`);
    }
  });
});

// Start the server
const PORT = 3000;
if (require.main === module) {
  server.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = server;

