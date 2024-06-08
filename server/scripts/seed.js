const db = require('../db/db')


async function main() {
    try {
        await db.category.updateMany({
            where: {
                name: 'Camera'
            },
            data: {
                name: 'Bags'
            }
        })

        console.log('Successs');

    } catch (error) {
        console.log('Error seeding the Database categories', error);
    } finally {
        await db.$disconnect()
    }
}

main()