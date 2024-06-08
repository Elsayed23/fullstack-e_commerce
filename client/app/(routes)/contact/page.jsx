import React from 'react'
import { auth } from '@clerk/nextjs'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { Slash } from 'lucide-react'
import { FiPhone } from 'react-icons/fi'
import { GoMail } from 'react-icons/go'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'


const page = async () => {


    const { userId } = auth()



    return (
        <>
            <title>Exclusive - Contact</title>

            <div className='py-10 min-h-[calc(100vh-478px)]'>
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
                                <BreadcrumbPage>Contact</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex flex-col gap-9 p-3 md:p-6 border-8 border-slate-50 rounded-sm">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red w-10 h-10 flex justify-center items-center rounded-full text-white">
                                        <FiPhone size={22} />
                                    </div>
                                    <h3 className='font-medium text-lg'>Call To Us</h3>
                                </div>
                                <h3 className='text-sm font-light'>We are available 24/7, 7 days a week.</h3>
                                <h3 className='text-sm font-light'>Phone: +8801611112222</h3>
                            </div>
                            <div className='h-[1px] bg-slate-800'></div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-red w-10 h-10 flex justify-center items-center rounded-full text-white">
                                        <GoMail size={22} />
                                    </div>
                                    <h3 className='font-medium text-lg'>Write To US</h3>
                                </div>
                                <h3 className='text-sm font-light max-w-64'>Fill out our form and we will contact you within 24 hours.</h3>
                                <h3 className='text-sm font-light'>Emails: customer@exclusive.com</h3>
                                <h3 className='text-sm font-light'>Emails: support@exclusive.com</h3>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 p-3 md:p-6 border-8 border-slate-50 rounded-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <Input type="text" placeholder="Your Name" />
                                <Input type="email" placeholder="Your Email" />
                                <Input type="text" placeholder="Your Phone" />
                            </div>
                            <Textarea placeholder="Your Message" className='min-h-60 max-h-80' />
                            <div className="flex justify-end">
                                <button className='px-8 py-4 rounded-sm bg-red text-white capitalize hover:opacity-95 duration-300'>
                                    SEND MESSAGE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page