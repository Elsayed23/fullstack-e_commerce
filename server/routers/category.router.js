const express = require("express")
const router = express.Router()

const { getAllCategories, getSpecificCategory } = require('../controllers/category.controller')

router.get('/categories', getAllCategories)
router.get('/categories/:id', getSpecificCategory)


module.exports = router