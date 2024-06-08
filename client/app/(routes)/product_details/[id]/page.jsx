'use client'
import { getSpecificProduct } from '@/app/api/products';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from '@/components/ui/button';
import { Heart, Slash, Star } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { MyContext } from '@/app/(context)/context';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import { FaTruck } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { RiLoopLeftFill } from 'react-icons/ri';
import { getSpecificCategory } from '@/app/api/category';
import ProductCard from '@/components/ProductCard';
import SecSwiper from '@/app/_components/SecSwiper';
import { CarouselItem } from '@/components/ui/carousel';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';

const Page = ({ params: { id } }) => {

    const { addToCart, removeFromCart, addToWishlist, removeFromWishlist, isInWishlist, isInCart } = useContext(MyContext)
    const [isInCartItem, setIsInCartItem] = useState(false)
    const [isInFavouriteItem, setIsInFavouriteItem] = useState(false)
    const [productData, setProductData] = useState(null)
    const [relatedProducts, setRelatedProducts] = useState(null)

    const pathanme = usePathname()
    const { isSignedIn } = useUser()

    useEffect(() => {
        setIsInFavouriteItem(isInWishlist.includes(id));
        setIsInCartItem(isInCart.includes(id))
    }, [isInWishlist, pathanme]);


    const getProduct = async () => {
        const pro = await getSpecificProduct(id)
        setProductData(pro)
    }
    const getRelatedItem = async () => {
        const products = await getSpecificCategory(productData?.categoryId)
        const relatedProductsAfterFilter = products?.data?.products?.filter(product => {
            return product?.id !== id
        })

        setRelatedProducts(relatedProductsAfterFilter)
    }

    const relatedPro = relatedProducts?.map((product, idx) => {
        return (
            <CarouselItem key={idx} className='basis-full md:basis-1/2 xl:basis-1/3'>
                <ProductCard {...product} />
            </CarouselItem >
        )
    })

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        getRelatedItem()
    }, [productData])

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


    return (
        <>
            <title>Exclusive - Product Details</title>

            <div className='min-h-[calc(100vh-73px)] py-24'>
                <div className="container px-4 mx-auto">
                    <Breadcrumb className='mb-20'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/products">Store</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{productData?.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                        <div className="bg-[#F5F5F5] flex justify-center items-center">
                            <Image src={productData?.imageUrl} alt="product" className='w-96 h-96' width={500} height={500} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h1 className='text-2xl font-medium max-w-sm'>{productData?.name}</h1>
                            <div className="flex items-center gap-2">
                                <div className='flex items-center gap-1'>
                                    {
                                        [1, 2, 3, 4].map(star => {
                                            return <Star fill='#FFAD33' key={0 + star} size={18} color='#FFAD33' />
                                        })
                                    }
                                    <Star fill='#64748b' color='#64748b' size={18} />
                                </div>
                                <span className='text-sm font-medium text-slate-500'>({productData?.ratingsQuantity} Reviews)</span>
                            </div>
                            <span className='text-lg'>${productData?.price}.00</span>
                            <p className='text-sm max-w-lg opacity-70 leading-relaxed'>{productData?.desc}</p>
                            <div className='h-[1.3px] bg-slate-800'></div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex sm:items-center flex-col sm:flex-row gap-3">
                                    <Button variant='destructive' className='px-11'>Buy Now</Button>
                                    <Button
                                        variant='destructive'
                                        onClick={handleCart}
                                        className='px-11'
                                    >
                                        {
                                            isInCartItem
                                                ?
                                                'Remove From Cart'
                                                :
                                                <>
                                                    <FiShoppingCart size={20} className='mr-2' />
                                                    Add To Cart
                                                </>
                                        }
                                    </Button>
                                </div>
                                <div onClick={handleWishlist} className="w-9 h-9 border flex justify-center items-center rounded-sm cursor-pointer group hover:bg-slate-200 duration-300">
                                    <Heart fill={isInFavouriteItem ? 'red' : 'white'} color={isInFavouriteItem ? 'red' : 'black'} size={20} className='duration-300' />
                                </div>
                            </div>
                            <div className="border rounded-sm">
                                <div className="flex items-center gap-5 p-5">
                                    <FaTruck size={25} />
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-sm font-medium'>Free Delivery</h4>
                                        <p className='underline text-xs font-medium'>Enter your postal code for Delivery Availability</p>
                                    </div>
                                </div>
                                <div className="flex items-center border-t gap-5 p-5">
                                    <RiLoopLeftFill size={25} />
                                    <div className='flex flex-col gap-2'>
                                        <h4 className='text-sm font-medium'>Return Delivery</h4>
                                        <p className='text-xs font-medium'>Free 30 Days Delivery Returns. <span className='cursor-pointer underline'>Details</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center gap-4">
                            <div className='bg-red w-5 h-12 rounded-sm'></div>
                            <h3 className='text-red font-medium'>Related Items</h3>
                        </div>
                        <SecSwiper>
                            {relatedPro}
                        </SecSwiper>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Page