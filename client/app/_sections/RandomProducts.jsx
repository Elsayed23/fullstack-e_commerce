import React from 'react'
import ProductCard from '@/components/ProductCard'
import { CarouselItem } from "@/components/ui/carousel"
import SecSwiper from '../_components/SecSwiper'
import SecTitle from '../_components/SecTitle'
import Link from 'next/link'
import { getRandomProducts } from '../api/products'


const RandomProducts = async () => {

    const data = await getRandomProducts()

    const products = data?.map((product, idx) => {
        return (
            <CarouselItem key={idx} className='basis-full md:basis-1/2 xl:basis-1/3'>
                <ProductCard {...product} />
            </CarouselItem>

        )
    })

    return (
        <div className='py-16'>
            <SecTitle T_title="Today's" B_title='Flash Sales' classes='mb-24 md:mb-8' showCountDown={true} />
            <SecSwiper>
                {products}
            </SecSwiper>
            <div className="flex justify-center mt-14">
                <Link href='/products'>
                    <button className='px-8 py-4 rounded-sm bg-red text-white capitalize hover:opacity-95 duration-300'>
                        view all products
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default RandomProducts


