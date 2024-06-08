const express = require("express")
const router = express.Router()

const { getUserWishlist, addToWishlist, removeFromWishlist } = require('../controllers/wishlist.controller')

router.get('/wishlist', getUserWishlist)
router.post('/wishlist', addToWishlist)
router.delete('/wishlist', removeFromWishlist)


module.exports = router