const db = require('../db/db')


const getUserWishlist = async ({ query: { userId } }, res) => {
    try {
        if (userId) {
            const userWishlist = await db.wishlist.findFirst({
                where: { userId: userId },
                include: {
                    items: {
                        include: { product: true }
                    },
                    _count: true
                }
            });

            res.status(200).json(userWishlist);
        } else {
            res.status(404).json({ message: 'Wishlist not found' });
        }
    } catch (error) {
        console.error('Error retrieving user wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};


const addToWishlist = async ({ body: { userId, productId } }, res) => {
    try {
        // Check if the user already has a wishlist
        let userWishlist = await db.wishlist.findFirst({
            where: { userId: userId },
            include: {
                _count: true,
            }
        });

        // If the user doesn't have a wishlist, create a new one
        if (!userWishlist) {
            userWishlist = await db.wishlist.create({
                data: { userId: userId }
            });
        }

        // Check if the item already exists in the wishlist
        const existingItem = await db.wishlistItem.findFirst({
            where: {
                productId,
                wishlistId: userWishlist.id
            }
        });


        if (existingItem) {
            // If the item exists, notify the user
            res.json({ success: false, message: 'Item already in wishlist' });
            return
        }

        // If the item doesn't exist, create a new wishlist item
        await db.wishlistItem.create({
            data: {
                wishlistId: userWishlist.id,
                productId: productId
            }
        });

        // Send success response
        return res.status(200).json({ success: true, message: 'Item added to wishlist successfully', data: userWishlist, productId });
    } catch (error) {
        console.error('Error adding item to wishlist:', error);

        // Attempt to save the wishlist item even if there's an error
        try {
            const userWishlist = await db.wishlist.create({
                data: { userId: userId },
                include: { items: true }
            });

            await db.wishlistItem.create({
                data: {
                    wishlistId: userWishlist.id,
                    productId: productId
                }
            });

            return res.status(200).json({ message: 'Item added to wishlist successfully, but encountered an error initially' });
        } catch (finalError) {
            console.error('Final error:', finalError);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
};

const removeFromWishlist = async ({ body: { userId, productId } }, res) => {

    try {
        const userWishlist = await db.wishlist.findFirst({
            where: { userId: userId }
        });

        if (!userWishlist) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }

        const existingItem = await db.wishlistItem.findFirst({
            where: {
                productId,
                wishlistId: userWishlist.id
            }
        });

        if (!existingItem) {
            return res.status(404).json({ error: 'Item not found in wishlist' });
        }

        await db.wishlistItem.delete({
            where: { id: existingItem.id }
        });

        res.status(200).json({ success: true, message: 'Item removed from wishlist', productId });
    } catch (error) {
        console.error('Error removing item from wishlist:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {
    getUserWishlist,
    addToWishlist,
    removeFromWishlist
}