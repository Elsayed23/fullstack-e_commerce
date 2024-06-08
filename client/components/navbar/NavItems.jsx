import React from 'react'
import Link from "next/link";
import { navLinks } from '../../app/constants'
import { useUser } from '@clerk/nextjs';
import { Button } from '../ui/button';

const NavItems = ({ isMobile, pathname }) => {

    const { isSignedIn } = useUser();

    return (
        isMobile
            ?
            <div className='fixed top-0 left-0 bottom-0 w-3/4 bg-zinc-900 pt-24 -translate-x-full will-change-transform z-50'>
                <ul className='flex flex-col gap-3 p-3'>
                    {
                        navLinks.map(({ link, title }, idx) => {
                            return (
                                <li key={idx} className='transform origin-left translate-x-[-20px] translate-y-[50%] will-change-[transform,opacity,filter]'>
                                    <Link href={link} className='font-semibold text-4xl p-2 sm:text-5xl sm:p-3 text-zinc-50 capitalize w-full block'>{title}</Link>
                                </li>
                            )
                        })
                    }
                    {
                        !isSignedIn
                        &&
                        <>
                            <li className='transform origin-left translate-x-[-20px] translate-y-[50%] will-change-[transform,opacity,filter]'>
                                <Link href='/sign-in'>
                                    <Button variant='outline' className='w-full'>sign in</Button>
                                </Link>
                            </li>
                            <li className='transform origin-left translate-x-[-20px] translate-y-[50%] will-change-[transform,opacity,filter]'>
                                <Link href='/sign-up'>
                                    <Button variant='outline' className='w-full'>sign up</Button>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
            :
            <ul className="my-2 flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center md:gap-6">
                {
                    navLinks.map(({ link, title }, idx) => {
                        return (
                            <li
                                key={idx}
                                className="p-1 font-medium"
                            >
                                <Link href={link} className={`flex items-center font-bold p-3 md:p-0 text-4xl md:text-sm md:font-medium relative before:absolute before:h-[1px] before:w-0 before:left-0 before:bottom-0 before:bg-zinc-400 hover:before:w-full before:duration-300 hover:text-zinc-400 duration-300 capitalize ${pathname === link && 'before:w-full text-zinc-400'}`}>
                                    {title}
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
    );
}


export default NavItems