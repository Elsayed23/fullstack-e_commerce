'use client'
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { createContext, useEffect, useState } from 'react'
import { toast } from 'sonner';

export const MyContext = createContext();

const Context = ({ children }) => {
    const { user, isSignedIn } = useUser()
    const [cart, setCart] = useState(null)
    const [cartItemsCount, setCartItemsCount] = useState(0)
    const [isInCart, setIsInCart] = useState([])
    const [wishlist, setWishlist] = useState(null)
    const [wishlistItemsCount, setWishlistItemsCount] = useState(0)
    const [isInWishlist, setIsInWishlist] = useState([])


    const getUserCart = async () => {
        try {
            if (isSignedIn) {
                const { data: { data } } = await axios.get(`${process.env.API_BASE_URL}/cart`, {
                    params: {
                        userId: user?.id
                    }
                })
                if (data) {
                    setCart(data)
                    setCartItemsCount(data._count.items || 0)
                    setIsInCart(data.items.map(item => item.productId))
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const getUserWishlist = async () => {
        try {
            if (isSignedIn) {
                const { data } = await axios.get(`${process.env.API_BASE_URL}/wishlist`, {
                    params: {
                        userId: user?.id
                    }
                })
                setWishlist(data)
                setIsInWishlist(data.items.map(item => item.productId));
                setWishlistItemsCount(data?._count?.items || 0);
            }
        } catch (error) {
            console.log(error);
        }
    }


    const addToCart = async (productId) => {
        try {
            if (isSignedIn) {
                const { data } = await axios.post(`${process.env.API_BASE_URL}/cart`, {
                    userId: user?.id,
                    productId
                })

                data?.success ? toast.success(data?.message) : toast.info(data?.message)

                setIsInCart(prev => {
                    return [
                        ...prev,
                        data?.productId
                    ]
                });

                if (data.data) {
                    setCartItemsCount(data?.data?._count?.items + 1 || 1)
                }
            }

        } catch (error) {
            console.log(error);

        }
    }

    const addToWishlist = async (productId) => {
        try {
            if (isSignedIn) {
                const { data } = await axios.post(`${process.env.API_BASE_URL}/wishlist`, {
                    userId: user?.id,
                    productId
                })

                data?.success ? toast.success(data?.message) : toast.info(data?.message)

                setIsInWishlist(prev => {
                    return [
                        ...prev,
                        data?.productId
                    ]
                });
                if (data.data) {
                    setWishlistItemsCount(data?.data?._count?.items + 1 || 1)
                }
            }
        } catch (error) {
            console.log(error);

        }
    }


    const removeFromCart = async (productId) => {
        try {
            const { data } = await axios.delete(`${process.env.API_BASE_URL}/cart`, {
                params: {
                    userId: user?.id,
                    productId,
                }
            })

            const newCart = cart?.items?.filter(({ product: { id } }) => {
                return id !== productId
            })

            setCart(prevData => {
                return {
                    ...prevData,
                    items: newCart
                }
            });

            const newCartIds = isInCart.filter((proId) => {
                return proId !== data?.productId
            })

            setIsInCart(newCartIds)

            setCartItemsCount(prev => prev - 1)
            toast.success('Item removed successfully from cart')
        } catch (error) {
            console.log(error);

        }
    }

    const removeFromWishlist = async (productId) => {
        console.log(productId);
        try {
            const { data } = await axios.delete(`${process.env.API_BASE_URL}/wishlist`, {
                data: {
                    userId: user?.id,
                    productId
                }
            });
            const newWishlist = wishlist?.items?.filter(({ product: { id } }) => {
                return id !== productId
            })

            setWishlist(prevData => {
                return {
                    ...prevData,
                    items: newWishlist
                }
            });
            console.log(newWishlist);
            const newWishlistIds = isInWishlist.filter((proId) => {
                return proId !== data?.productId
            })

            setIsInWishlist(newWishlistIds)

            setWishlistItemsCount(prev => prev - 1)
            toast.success('Item removed successfully from wishlist')

        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };


    useEffect(() => {
        getUserCart()
        getUserWishlist()
    }, [user?.id])

    return (
        <MyContext.Provider value={{
            getUserCart,
            getUserWishlist,
            cart,
            cartItemsCount,
            wishlist,
            wishlistItemsCount,
            isInWishlist,
            addToCart,
            addToWishlist,
            removeFromCart,
            removeFromWishlist,
            isInCart
        }}>
            {children}
        </MyContext.Provider>
    )
}


export default Context