import { getAllProducts } from '@/app/api/products'
import ProductCard from '@/components/ProductCard'
import React from 'react'

const page = async () => {

    const data = await getAllProducts()

    const products = data?.map((product, idx) => {
        return (
            <ProductCard key={idx} {...product} />
        )
    })


    return (
        <>
            <title>Exclusive - products</title>
            <div className="py-9">
                <div className="container mx-auto flex flex-col">
                    <h1 className='text-center text-4xl mb-8 font-semibold'>
                        Explore Our Products
                    </h1>
                    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page