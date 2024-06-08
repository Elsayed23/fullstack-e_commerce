const db = require('../db/db')


const getAllCategories = async (req, res) => {
    try {
        const data = await db.category.findMany()
        res.status(200).send({ success: true, data: data })

    } catch (error) {
        console.log(error);
    }
}

const getSpecificCategory = async ({ params: { id } }, res) => {
    try {
        const data = await db.category.findFirst({
            where: {
                id
            },
            include: {
                products: true
            }
        })
        res.status(200).send({ success: true, data: data })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAllCategories,
    getSpecificCategory
}