// Import the required modules
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let items = [
    { id: 1, name: 'Book', description: 'Used for reading,from various popular authors', quantity: 10 },
    { id: 2, name: 'Item 2', description: 'Description for Item 2', quantity: 5 },
    { id: 3, name: 'Item 3', description: 'Description for Item 3', quantity: 8 }
];

// GET: Retrieve all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET: Retrieve a single item by ID
app.get('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST: Add a new item
app.post('/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description || '',
        quantity: req.body.quantity || 0
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT: Update an existing item by ID
app.put('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
        items[itemIndex].name = req.body.name || items[itemIndex].name;
        items[itemIndex].description = req.body.description || items[itemIndex].description;
        items[itemIndex].quantity = req.body.quantity !== undefined ? req.body.quantity : items[itemIndex].quantity;
        res.json(items[itemIndex]);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE: Remove an item by ID
app.delete('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(i => i.id === itemId);
    if (itemIndex !== -1) {
        const deletedItem = items.splice(itemIndex, 1);
        res.json(deletedItem);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// PATCH: Update specific fields of an item by ID
app.patch('/items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const item = items.find(i => i.id === itemId);
    if (item) {
        if (req.body.name !== undefined) item.name = req.body.name;
        if (req.body.description !== undefined) item.description = req.body.description;
        if (req.body.quantity !== undefined) item.quantity = req.body.quantity;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// GET: Search items by name (query parameter)
app.get('/search', (req, res) => {
    const query = req.query.name?.toLowerCase();
    if (query) {
        const results = items.filter(item => item.name.toLowerCase().includes(query));
        res.json(results);
    } else {
        res.status(400).json({ message: 'Query parameter "name" is required' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
