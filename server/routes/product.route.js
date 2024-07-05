const express = require("express")
const router = express.Router()

const { getProducts, getSpecificProduct } = require('../controllers/product.controller')

router.get('/products', getProducts)
router.get('/products/:id', getSpecificProduct)


module.exports = router