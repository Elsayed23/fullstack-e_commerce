'use client'
import { UserButton, useUser } from '@clerk/nextjs';
import { IoCartOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import { Profile } from '../Profile'
import { usePathname } from 'next/navigation';
import Loading from '../Loading';
import { MyContext } from '@/app/(context)/context';
import { navLinks } from '@/app/constants';
import NavItems from './NavItems'
import MobileNav from './MobileNav'
import { useWindowSize } from '@/app/hooks/useWindowSize'



const NavLinks = ({ path }) => {
    return (
        navLinks.map(({ link, title }, idx) => {
            return (
                <li key={idx}>
                    <Link href={link} className={`capitalize py-1 text-black block ${path === link && 'border-b-2 border-b-black border-opacity-45'}`}>
                        {title}
                    </Link>
                </li>
            )
        })
    )

}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const { width } = useWindowSize()



    const path = usePathname()


    const { isSignedIn, user, isLoaded } = useUser();

    const { cartItemsCount, wishlistItemsCount } = useContext(MyContext)

    useEffect(() => {
        setIsOpen(false)
    }, [path])

    if (!isLoaded) {
        return <Loading />;
    }




    const isMobile = width < 768



    return (
        <header className='py-5 border-b'>
            <nav>
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <Link href='/' className='text-xl sm:text-2xl font-bold'>
                            Exclusive
                        </Link>
                        <ul className='hidden items-center gap-7 md:flex'>
                            <NavItems isMobile={isMobile} pathname={path} />

                            {
                                !isSignedIn
                                &&
                                <>
                                    <li>
                                        <Link href='/sign-in' className={`capitalize font-bold py-1 text-black block`}>
                                            sign in
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href='/sign-up' className={`capitalize font-bold py-1 text-black block`}>
                                            sign up
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-3 md:gap-5">
                                <Link href={isSignedIn ? '/wishlist' : '/sign-in'} className='flex items-center gap-[1px] relative'>
                                    <IoIosHeartEmpty size={27} />
                                    <div className='w-5 h-5 bg-red rounded-full absolute -right-2 -top-2 text-xs text-white text-center leading-5'>{isSignedIn ? wishlistItemsCount : '0'}</div>
                                </Link>
                                <Link href={isSignedIn ? '/cart' : '/sign-in'} className='flex items-center gap-[1px] relative'>
                                    <IoCartOutline size={27} />
                                    <div className='w-5 h-5 bg-red rounded-full absolute -right-2 -top-2 text-xs text-white text-center leading-5'>{isSignedIn ? cartItemsCount : '0'}</div>
                                </Link>
                            </div>
                            {
                                isSignedIn
                                &&
                                <>
                                    <div className='w-[2px] h-9 bg-black'></div>
                                    <Profile imageUrl={user.imageUrl} />
                                    {/* <UserButton /> */}
                                </>
                            }
                            {
                                isMobile
                                &&
                                <MobileNav isMobile={isMobile} isOpen={isOpen} setIsOpen={setIsOpen} />
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar