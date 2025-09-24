const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const users = [];

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

// POST /users
app.post('/users', (req, res) => 
    {
    const { name, email } = req.body || {};
    if (!name || !email) 
        {
            return res.status(400).json({ error: 'name and email are required' });
        }

    const user = 
    {
        id: randomUUID(),
        name,
        email
    };

    users.push(user);
    return res.status(201).json(user);
});

// GET /users/:id
app.get('/users/:id', (req, res) => 
    {
    const { id } = req.params;
    const user = users.find(u => u.id === id);

    if (!user) 
        {   
            return res.status(404).json({ error: 'User not found' });
        }

    return res.status(200).json(user);
});

// PUT /users/:id
app.put('/users/:id', (req, res) => 
    {
    const { id } = req.params;
    const { name, email } = req.body || {};

    if (!name || !email) 
        {
            return res.status(400).json({ error: 'name and email are required' });
        }

    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) 
        {
            return res.status(404).json({ error: 'user not found' });
        }

    users[idx] = { id, name, email };
    return res.status(200).json(users[idx]);
});

// DELETE /users/:id
app.delete('/users/:id', (req, res) => 
    {
    const { id } = req.params;
    const idx = users.findIndex(u => u.id === id);

    if (idx === -1) 
        {
            return res.status(404).json({ error: 'user not found' });
        }

    users.splice(idx, 1);
    return res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing