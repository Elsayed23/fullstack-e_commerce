import React from 'react'
import SecTitle from '../_components/SecTitle'
import { getRandomProducts } from '@/app/api/products'
import ProductCard from '@/components/ProductCard'

const BestSelling = async () => {

    const data = await getRandomProducts()

    const products = data?.slice(0, 4)?.map((product, idx) => {
        return (
            <ProductCard key={idx} {...product} />
        )
    })

    return (
        <div className='py-16'>
            <SecTitle T_title="This Month" B_title='Best Selling Products' />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products}
            </div>
        </div>
    )
}

export default BestSelling