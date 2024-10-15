const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
app.use(express.json());

// Set up database connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
    } else {
        console.log('Connected to the database');
    }
});

// API endpoint to calculate total value
app.post('/api/products/total-value', (req, res) => {
    const products = req.body.products;

    if (!products || !Array.isArray(products)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    let totalValue = 0;

    products.forEach(product => {
        const { price, quantity } = product;
        totalValue += price * quantity;
    });

    res.json({ totalValue });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
