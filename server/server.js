const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cart = require('./routers/cart.router.js')
const wishlist = require('./routers/wishlist.router.js')
const products = require('./routers/product.router.js')
const categories = require('./routers/category.router.js')
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
