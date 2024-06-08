'use client'
import { Eye, Heart, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { MyContext } from '@/app/(context)/context'
import { FaRegTrashAlt } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'


const ProductCard = ({
    id,
    name,
    price,
    imageUrl,
    ratingsQuantity,
}) => {

    const [isInFavouriteItem, setIsInFavouriteItem] = useState(false)
    const [isInCartItem, setIsInCartItem] = useState(false)
    const { isSignedIn } = useUser()

    const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useContext(MyContext)

    useEffect(() => {
        setIsInFavouriteItem(isInWishlist.includes(id));
        setIsInCartItem(isInCart.includes(id))
    }, [isInWishlist, id]);


    const path = usePathname()

    const isWishlistPage = path === '/wishlist'


    const handleCart = () => {
        if (isSignedIn) {
            setIsInCartItem(prev => !prev)
            if (isInCartItem) {
                removeFromCart(id)

            } else {
                addToCart(id)
            }
        } else {
            toast.info('You have to login!')

        }

    }

    const handleWishlist = () => {
        if (isSignedIn) {
            setIsInFavouriteItem(prev => !prev)
            if (isInFavouriteItem) {
                removeFromWishlist(id)
            } else {
                addToWishlist(id)
            }
        } else {
            toast.info('You have to login!')

        }
    }


    return (
        <div className='rounded-tr-md rounded-tl-md bg-white relative group block duration-300 border-b pb-4'>

            <div className="flex flex-col gap-2 absolute top-3 sm:top-4 right-3 sm:right-5 z-10">
                {
                    isWishlistPage
                        ?
                        <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:bg-red hover:text-white duration-300" onClick={() => { removeFromWishlist(id) }}>
                            <FaRegTrashAlt size={20} />
                        </div>
                        :

                        <div className="flex justify-center items-center w-10 h-10 bg-white rounded-full cursor-pointer hover:bg-slate-200 duration-300" onClick={handleWishlist}>
                            <Heart size={20} className='duration-300' fill={isInFavouriteItem ? 'red' : 'white'} color={isInFavouriteItem ? 'red' : 'black'} />
                        </div>

                }
            </div>
            <div className='relative overflow-hidden'>
                <Link href={`/product_details/${id}`} className="bg-[#F5F5F5] rounded-md h-72 p-3 flex justify-center items-center px-4">
                    <Image src={imageUrl} loading='lazy' alt={name} width={500} height={1000} className='w-full h-full rounded-sm object-contain' />
                </Link>
                <div className={`${!isWishlistPage ? 'absolute bottom-0 w-full translate-y-full group-hover:translate-y-0' : ''}  duration-300`}>
                    <Button
                        className='w-full capitalize rounded-none rounded-br-md rounded-bl-md bg-black hover:bg-slate-900'
                        onClick={handleCart}
                    >
                        {
                            isInCartItem
                                ? 'Remove From Cart'
                                :
                                <>
                                    <FiShoppingCart size={20} className='mr-2' /> Add To Cart
                                </>
                        }
                    </Button>
                </div>
            </div>
            <div className="pt-4 flex flex-col gap-2 mb-2 bg-white">
                <h2 className='font-medium line-clamp-1'>{name}</h2>
                <span className='text-red font-medium'>${price}</span>
            </div>
            {
                !isWishlistPage
                &&
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                        {
                            [1, 2, 3, 4, 5].map(star => {
                                return <Star fill='#FFAD33' key={0 + star} size={18} color='#FFAD33' />
                            })
                        }
                    </div>
                    <span className='text-slate-400 text-sm font-semibold'>({ratingsQuantity})</span>
                </div>
            }
        </div>
    )
}

export default ProductCard