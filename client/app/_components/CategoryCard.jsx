import Link from 'next/link';
import React from 'react'


const CategoryCard = ({
    id,
    name,
    image
}) => {
    return (
        <Link href={`/category_details/${id}`} className='flex flex-col gap-3 items-center p-6 border rounded-md group hover:fill-white hover:text-white hover:bg-red stroke-black hover:stroke-white duration-300'>

            <div dangerouslySetInnerHTML={{ __html: image || '' }} className={`fill-transparent`} />

            <h2 className='text-center'>{name}</h2>
        </Link>
    )
}

export default CategoryCard