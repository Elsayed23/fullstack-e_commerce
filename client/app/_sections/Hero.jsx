'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LuArrowRight } from 'react-icons/lu'

const Hero = () => {

    const sideItemsData = [
        "woman's fashion",
        "men's fashion",
        "electronics",
        "home & lifestle",
        "medicine",
        "sports & outdoor",
        "baby's & toys",
        "groceries & pets",
        "health & beauty"
    ]

    const sideItems = sideItemsData.map((item, idx) => {
        return (
            <li key={idx} className='text-sm capitalize font-medium md:w-52 cursor-pointer'>{item}</li>
        )
    })
    console.log(process.env.API_BASE_URL);
    return (
        <div className="mb-24 md:mb-36">
            <div className="flex">
                <div className="border-r pt-12 hidden lg:block">
                    <ul className='flex flex-col gap-5'>
                        {
                            sideItems
                        }
                    </ul>
                </div>
                <div className='mt-4 lg:ml-12 lg:mt-12 w-full lg:h-96 bg-black rounded-md'>
                    <div className="flex justify-between items-center px-3 py-12 lg:p-0 flex-col-reverse lg:flex-row h-full">
                        <div className="flex flex-col gap-5 lg:p-16 text-white">
                            <div className="flex items-center gap-7">
                                <Image src={require('../assets/images/apple_logo.png')} alt='apple logo' width={40} height={50} />
                                <h3 className='font-medium text-base md:text-lg xl:text-xl'>iPhone 14 Series</h3>
                            </div>
                            <h1 className='font-medium lg:text-3xl xl:text-5xl leading-tight xl:max-w-72'>Up to 10%  off Voucher</h1>
                            <Link href='/products' className="flex gap-2 w-fit">
                                <span className='underline decoration-white underline-offset-8'>Shop Now</span>
                                <LuArrowRight size={25} />
                            </Link>
                        </div>
                        <Image src={require('../assets/images/iphone_frame.png')} alt='iphone frame' className='h-fit' />

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Hero