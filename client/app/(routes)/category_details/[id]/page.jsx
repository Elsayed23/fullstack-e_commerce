import React from 'react'
import { getSpecificCategory } from '@/app/api/category'
import ProductCard from '@/components/ProductCard'

const page = async ({ params: { id } }) => {


    const { data: { name, products } } = await getSpecificCategory(id)

    const productCard = products?.map((product, idx) => {
        return (
            <ProductCard key={idx} {...product} />
        )
    })



    return (
        <div className="py-9">
            <div className="container mx-auto flex flex-col">
                <h1 className='text-center text-4xl mb-8 font-semibold'>
                    {name}
                </h1>
                <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {productCard}
                </div>
            </div>
        </div>
    )
}

export default page