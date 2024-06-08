import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Slash } from 'lucide-react'
import menImage from '@/app/assets/images/about.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import { aboutCardsData } from '@/app/constants'
import Card from './_components/Card'

const page = () => {



    const cards = aboutCardsData.map((card, idx) => {
        return (
            <Card key={idx} {...card} />
        )
    })

    return (
        <>
            <title>Exclusive - About</title>
            <div className='min-h-[calc(100vh-73px)] py-24'>
                <div className="container px-4 mx-auto">
                    <Breadcrumb className='mb-20'>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link href="/">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>About</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex justify-between flex-col gap-9 lg:gap-0 lg:flex-row items-center mb-20">
                        <div className="flex flex-col gap-8">
                            <h1 className='text-5xl font-medium'>Our Story</h1>
                            <p className='text-sm text-opacity-85 max-w-lg leading-relaxed'>
                                Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
                                <br />
                                <br />
                                Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
                            </p>
                        </div>
                        <Image src={menImage} width={600} height={600} className='rounded-sm' alt='ecommerce' />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {cards}
                    </div>
                </div>
            </div>
        </>
    )
}

export default page