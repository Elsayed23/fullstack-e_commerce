import React from 'react'

const Card = ({
    icon,
    num,
    con
}) => {
    return (
        <div className='p-5 flex flex-col border rounded-sm items-center gap-2 text-center group hover:bg-red hover:text-white duration-300 z-[1]'>
            <div className="bg-black relative before:absolute before:inset-0 group-hover:bg-white duration-300 group-hover:before:bg-white group-hover:before:bg-opacity-30 group-hover:text-black before:bg-black before:bg-opacity-30 before:rounded-full before:z-[-1] before:scale-125 w-9 h-9 flex justify-center items-center rounded-full text-white">
                {icon}
            </div>
            <h2 className='text-xl font-semibold'>{num}</h2>
            <p className='text-xs'>{con}</p>
        </div>
    )
}

export default Card