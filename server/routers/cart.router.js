const express = require("express")
const router = express.Router()

const { getCart, addToCart, updateCartItemQuantity, removeFromCart } = require('../controllers/cart.controller')

router.get('/cart', getCart)
router.post('/cart', addToCart)
router.delete('/cart', removeFromCart)
router.put('/quantity', updateCartItemQuantity)


module.exports = router