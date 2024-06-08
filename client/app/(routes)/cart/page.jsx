'use client'
import React, { useContext, useEffect, useState } from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'
import { MyContext } from '@/app/(context)/context'
import Card from './_components/Card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Page = () => {
    const { cart, getUserCart, removeFromCart } = useContext(MyContext)
    const [quantities, setQuantities] = useState({})

    useEffect(() => {
        if (cart?.items) {
            const initialQuantities = cart.items.reduce((acc, item) => {
                acc[item.product.id] = item.quantity;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cart]);

    const handleRemoveFromCart = (id) => {
        removeFromCart(id);
        setQuantities(prev => {
            const newQuantities = { ...prev };
            delete newQuantities[id];
            return newQuantities;
        });
    }

    const handleQuantityChange = (id, quantity) => {
        setQuantities(prev => ({ ...prev, [id]: quantity }));
    }

    const getTotalPrice = Object.keys(quantities).reduce((total, id) => {
        const item = cart.items.find(item => item.product.id === id);
        return total + (item.product.price * quantities[id]);
    }, 0);

    const products = cart?.items?.map(({ quantity, product }, idx) => (
        <Card
            key={idx}
            {...product}
            quantity={quantities[product.id] || quantity}
            handleRemoveFromCart={handleRemoveFromCart}
            handleQuantityChange={handleQuantityChange}
        />
    ));

    useEffect(() => {
        getUserCart();
    }, []);

    return (
        <>
            <title>Exclusive - Cart</title>

            <div className='py-24 min-h-[calc(100vh-478px)]'>
                <div className="container mx-auto px-4">
                    <Breadcrumb className='mb-20'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>Cart</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col gap-7 mb-6">
                        <div className="hidden md:flex gap-44 items-center px-7 py-6 shadow-md">
                            <div className="flex flex-wrap items-center justify-between w-full">
                                <h3>Product</h3>
                                <h3>Price</h3>
                            </div>
                            <div className="flex flex-wrap items-center justify-between w-full">
                                <h3>Quantity</h3>
                                <h3>Subtotal</h3>
                            </div>
                        </div>
                        {products}
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row justify-between items-start">
                        <Link href='/products'>
                            <Button variant='outline'>Return To Shop</Button>
                        </Link>
                        <div className="p-4 border-2 rounded-sm min-w-full sm:min-w-96">
                            <h3 className='font-medium text-lg'>Cart Total</h3>
                            <div className="flex items-center py-3 justify-between">
                                <h3>Subtotal:</h3>
                                <h3>${getTotalPrice.toFixed(2)}</h3>
                            </div>
                            <div className="flex items-center py-3 justify-between border-y">
                                <h3>Shipping:</h3>
                                <h3>Free</h3>
                            </div>
                            <div className="flex items-center py-3 justify-between">
                                <h3>Total:</h3>
                                <h3>${getTotalPrice.toFixed(2)}</h3>
                            </div>
                            <div className='flex justify-center'>
                                <Button variant='destructive'>Proceed to checkout</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page
