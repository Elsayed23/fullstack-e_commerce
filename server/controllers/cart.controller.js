const db = require('../db/db')

// Get user cart
const getCart = async ({ query: { userId } }, res) => {
    try {
        if (userId) {
            const cart = await db.cart.findFirst({
                where: {
                    userId
                },
                include: {
                    items: {
                        include: {
                            product: true
                        }
                    },
                    _count: true
                }
            });

            res.send({ success: true, results: cart?._count || 0, data: !cart ? [] : cart })
        } else {
            res.status(404).send({ message: 'Not found cart' })
        }

    } catch (error) {
        console.log(error);
    }
}

// Add to cart
const addToCart = async ({ body: { userId, productId, quantity } }, res) => {
    try {
        // Check if the cart exists for the user
        if (userId) {
            let cart = await db.cart.findFirst({
                where: {
                    userId
                },
                include: {
                    _count: true,
                }
            });

            // If the cart doesn't exist, create a new one
            if (!cart) {
                cart = await db.cart.create({
                    data: {
                        userId
                    }
                });
            }

            // Check if the item already exists in the cart
            let existingCartItem = await db.cartItem.findFirst({
                where: {
                    productId,
                    cartId: cart.id
                }
            });

            // If the item exists, log a message and update the quantity
            if (existingCartItem) {
                res.send({ success: false, message: 'Item already exists in the cart' });
                return;
            } else {
                // Check if the product exists
                const product = await db.product.findUnique({
                    where: {
                        id: productId
                    }
                });

                if (!product) {
                    throw new Error("Item not found");
                }

                // If the item doesn't exist, add it to the cart
                await db.cartItem.create({
                    data: {
                        quantity: quantity,
                        productId,
                        cartId: cart.id
                    }
                });
            }
            res.status(200).send({ success: true, message: 'Item added to cart successfully.', data: cart, productId })
        } else {
            res.status(201).send({ success: false, message: 'You must be logged in.' })
        }

    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
}

const removeFromCart = async ({ query: { userId, productId } }, res) => {

    try {
        // Find the user's cart
        const cart = await db.cart.findFirst({
            where: {
                userId: userId,
            },
        });

        // If the cart doesn't exist, return an error
        if (!cart) {
            return res.status(404).send({ success: false, message: "Cart not found for the user." });
        }

        // Find the cart item
        const cartItem = await db.cartItem.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        });

        // If the cart item doesn't exist, return an error
        if (!cartItem) {
            return res.status(404).send({ success: false, message: "Product not found in the cart." });
        }

        // Remove the cart item
        await db.cartItem.delete({
            where: {
                id: cartItem.id
            }
        });

        res.status(200).send({ success: true, message: "Product removed from cart successfully.", data: cart, productId });
    } catch (error) {
        console.error("Error removing product from cart:", error);
        res.status(500).send({ success: false, message: "Error removing product from cart.", error });
    }
}


const updateCartItemQuantity = async ({ body: { userId, productId, quantity } }, res) => {
    try {
        // Find the user's cart
        let cart = await db.cart.findFirst({
            where: {
                userId: userId
            }
        });

        // If the cart doesn't exist, return an error
        if (!cart) {
            res.send({ success: false, message: "Cart not found for the user." })
        }

        // Find the cart item
        let cartItem = await db.cartItem.findFirst({
            where: {
                productId: productId,
                cartId: cart.id
            }
        });

        // If the cart item doesn't exist, return an error
        if (!cartItem) {
            res.send({ success: false, message: "Product not found in the cart." });
        }

        // Update the quantity of the cart item
        cartItem = await db.cartItem.update({
            where: {
                id: cartItem.id
            },
            data: {
                quantity
            }
        });

        res.send({ success: true, message: "Cart item quantity updated successfully.", data: cartItem });
    } catch (error) {
        console.error("Error updating cart item quantity:", error);
        res.send({ success: false, message: "Error updating cart item quantity.", error });
    }
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity
}