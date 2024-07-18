const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cart = require('./routes/cart.route.js')
const wishlist = require('./routes/wishlist.route.js')
const products = require('./routes/product.route.js')
const categories = require('./routes/category.route.js')
const path = require('path');

const app = express()

const port = process.env.PORT


app.set('view engine', 'ejs');

// Define the directory for EJS templates
app.set('views', path.join(__dirname, 'views'));

// Home Page Route
app.get('/', (req, res) => {
    res.render('index', { title: 'Home Page' });
});

// Middleware
app.use(express.json())
app.use(cors())


// Cart
app.use('/api/v1', cart)

// Wishlist
app.use('/api/v1', wishlist)

// Products
app.use('/api/v1', products)

// Categories
app.use('/api/v1', categories)

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
