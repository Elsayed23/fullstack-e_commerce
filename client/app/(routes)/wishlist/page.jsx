'use client'
import { MyContext } from '@/app/(context)/context'
import ProductCard from '@/components/ProductCard'
import React, { useContext, useEffect } from 'react'


const Page = () => {


    const { wishlist, getUserWishlist, wishlistItemsCount } = useContext(MyContext)

    useEffect(() => {
        getUserWishlist()
    }, [])

    const products = wishlist?.items?.map(({ product }, idx) => {
        return (
            <ProductCard key={idx} {...product} />
        )
    })

    return (
        <>
            <title>Exclusive - Wishlist</title>
            <div className='py-10 min-h-[calc(100vh-478px)]'>
                <div className="container px-4 mx-auto">
                    <h1 className='md:p-8 font-medium text-4xl mb-8 md:mb-0'>Withlist <span className='text-2xl'>({wishlistItemsCount})</span></h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {products}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page