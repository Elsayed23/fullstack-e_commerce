import React from 'react'
import { GoPaperAirplane } from "react-icons/go";
import download from '../app/assets/images/footerDownloadApp.png'
import Image from 'next/image';
import { footerData } from '@/app/constants'

const currYear = new Date().getFullYear()

const Footer = () => {
    return (
        <footer className="bg-black text-white pt-20 -z-10">
            <div className="container mx-auto px-4">
                {/* Exclusive Section */}


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    <div className="mb-8">
                        <h5 className="text-xl font-bold mb-6">Exclusive</h5>
                        <p className="text-[#FAFAFA] text-sm mb-3">Get 10% off your first order</p>
                        <div className="relative z-0  w-full md:w-11/12">
                            <input type="email" placeholder="Enter your email" className="py-3 pl-4 pr-12 w-full border-2 border-white rounded-sm bg-black placeholder:text-slate-400 placeholder:text-sm focus:outline-none" />
                            <GoPaperAirplane size={25} className='absolute right-4 top-2/4 -translate-y-2/4 cursor-pointer' />
                        </div>
                    </div>

                    {footerData.map((section, idx) => (
                        <div key={idx} className="flex flex-col gap-6">
                            <h5 className="text-xl">{section.title}</h5>
                            <ul className="flex flex-col gap-4">
                                {
                                    section.content.map((list, idx) => {
                                        return <li key={idx} className="max-w-48">{list}</li>
                                    })
                                }
                            </ul>
                        </div>
                    ))}
                    <div className="mb-8">
                        <h5 className="text-xl mb-6">Download App</h5>
                        <h5 className='text-[#FAFAFA] text-sm mb-3'>Save $3 with App New User Only</h5>
                        <Image src={download} alt='download' className='w-full' />
                    </div>
                </div>
            </div>
            <div className="text-center mt-6 py-5 border-t text-wrap px-4 border-t-white text-white border-opacity-45 text-opacity-45 text-sm">
                <p>Copyright©{currYear}ElsayedKewan All Rights Reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
