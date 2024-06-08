import { LuStore } from 'react-icons/lu'
import { AiOutlineDollar } from 'react-icons/ai'
import { IoBagHandleOutline } from 'react-icons/io5'
import { TbMoneybag } from 'react-icons/tb'

export const navLinks = [
    {
        title: 'home',
        link: '/',
    },
    {
        title: 'store',
        link: '/products'
    },
    {
        title: 'About',
        link: '/about'
    },
    {
        title: 'Contact',
        link: '/contact'
    },
]

export const aboutCardsData = [
    {
        icon: <LuStore className='w-6 h-6' />,
        num: '10.5k',
        con: 'Sallers active our site'
    },
    {
        icon: <AiOutlineDollar className='w-6 h-6' />,
        num: '33k',
        con: 'Mopnthly Produduct Sale'
    },
    {
        icon: <IoBagHandleOutline className='w-6 h-6' />,
        num: '45.5k',
        con: 'Customer active in our site'
    },
    {
        icon: <TbMoneybag className='w-6 h-6' />,
        num: '25k',
        con: 'Anual gross sale in our site'
    },
]

export const footerData = [
    {
        title: "Support",
        content: [
            "111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.",
            "exclusive@gmail.com",
            "+88015-88888-9999"
        ],
    },
    {
        title: "Account",
        content: [
            "My Account",
            "Login / Register",
            "Cart",
            "Wishlist",
            "Shop"
        ],
    },
    {
        title: "Quick Link",
        content: [
            "Privacy Policy",
            "Terms Of Use",
            "FAQ",
            "Contact"
        ],
    },
];