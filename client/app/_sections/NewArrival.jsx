'use client'
import React from 'react'
import Link from 'next/link';
import SecTitle from '../_components/SecTitle'
import Image from 'next/image';

const NewArrival = () => {
    return (
        <div className='py-16'>
            <SecTitle T_title="Featured" B_title='New Arrival' />
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Box classes='h-full' img={require('../assets/images/newArrival-1.png')} title='PlayStation 5' con='Black and White version of the PS5 coming out on sale.' />
                </div>
                <div className="flex-1">
                    <div className="flex flex-col gap-4">
                        <Box classes='h-96' img={require('../assets/images/newArrival-2.png')} title='Speakers' con='Amazon wireless speakers' />
                        <Box classes='h-96' img={require('../assets/images/newArrival-3.png')} title='Perfume' con='GUCCI INTENSE OUD EDP' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewArrival

const Box = ({
    img,
    title,
    con,
    classes
}) => {
    return (
        <div className={`relative bg-black py-12 ${classes}`}>
            <Image src={img} width={450} height={650} alt='img' className='w-full h-full object-contain' />
            <div className="absolute text-white flex flex-col gap-3 left-0 bottom-0 p-7">
                <h3 className='text-2xl font-medium'>{title}</h3>
                <p className='opacity-85 text-sm max-w-xs'>{con}</p>
                <Link href='/' className='underline mb-2'>
                    Shop Now
                </Link>
            </div>
        </div>
    )
}