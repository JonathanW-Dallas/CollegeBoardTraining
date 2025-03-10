const fs = require('fs'); // ✅ Add this line
const path = require('path');
const request = require('supertest');
const server = require('./server'); // Ensure it's imported properly

const DATA_FILE = path.join(__dirname, 'groceries.json');

describe("Grocery Shopping API", () => {
  let app;

  beforeAll((done) => {
    app = server.listen(3001, done); // ✅ Start test server on a different port
  });

  beforeEach(() => {
    // ✅ Reset groceries.json before each test
    fs.writeFileSync(DATA_FILE, JSON.stringify([]), 'utf8');
  });

  afterAll((done) => {
    app.close(done); // ✅ Properly close the server after tests
  });

  test("GET /groceries should return the grocery list", async () => {
    const response = await request(app).get('/groceries');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("GET /invalid-route should return 404", async () => {
    const response = await request(app).get('/invalid-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
});

  test("POST /groceries should add a new item", async () => {
    const newItem = { name: "Bread", price: 1.5, quantity: 2, purchased: false };
    
    const response = await request(server)
      .post('/groceries')
      .send(newItem)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Item added");
    expect(response.body.item).toMatchObject(newItem);
  });

  test("POST /groceries should return 400 for invalid input", async () => {
    const invalidItem = { name: "Invalid", quantity: "wrong type" };

    const response = await request(server)
      .post('/groceries')
      .send(invalidItem)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Invalid input data");
  });

  test("GET /invalid-route should return 404", async () => {
    const response = await request(server).get('/invalid-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
