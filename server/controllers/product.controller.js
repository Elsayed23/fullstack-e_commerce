const db = require('../db/db')


const getProducts = async ({ query: { limit, category } }, res) => {
    try {
        if (category) {
            const products = await db.product.findMany({
                where: {
                    categoryId: category
                }
            })
            products.length !== 0
                ?
                res.status(200).send({ success: true, results: products.length, data: products })
                :
                res.status(200).send({ results: products.length, message: 'No products found with this category' })


        } else {
            let products = await db.product.findMany({
                include: {
                    category: true,
                },
            })

            products = limit ? products.slice(0, limit) : products

            res.status(200).send({ success: true, results: products.length, data: products })
        }



    } catch (error) {
        console.log(error);
    }
}

const getSpecificProduct = async ({ params: { id } }, res) => {
    try {
        const product = await db.product.findFirst({
            where: {
                id
            },
            include: {
                category: true
            }
        })
        if (product) {
            res.status(200).send({ success: true, data: product })
        } else {
            res.status(404).send({ success: false, message: 'Not found product with this id.' })
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getSpecificProduct
}