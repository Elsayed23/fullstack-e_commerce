'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { updateCartItemQuantity } from '@/app/api/cart'
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { HiMiniXMark } from 'react-icons/hi2';

const Card = ({
    id,
    imageUrl,
    name,
    price,
    quantity,
    handleRemoveFromCart,
    handleQuantityChange
}) => {
    const { user } = useUser()
    const [localQuantity, setLocalQuantity] = useState(quantity)
    const [saveButton, setSaveButton] = useState(false)

    useEffect(() => {
        setLocalQuantity(quantity);
    }, [quantity]);

    const handleChange = ({ target: { value } }) => {
        if (Number(value) < 1) {
            toast.info('The quantity cannot be zero or negative')
        } else if (Number(value) > 20) {
            toast.info('The maximum quantity is 20')
        } else {
            setLocalQuantity(Number(value))
            setSaveButton(true)
        }
    }

    const handleUpdateQuantity = () => {
        updateCartItemQuantity(user?.id, id, localQuantity)
        handleQuantityChange(id, localQuantity)
        setSaveButton(false)
    }

    return (
        <div className="flex justify-between items-center gap-3 px-4 md:px-7 py-6 shadow-md flex-col md:flex-row lg:gap-44 group">
            <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between w-full">
                <div className="flex items-center gap-3 w-80 relative">
                    <div onClick={() => { handleRemoveFromCart(id) }} className="border w-6 h-6 rounded-full bg-red md:invisible group-hover:visible flex justify-center items-center absolute left-0 top-0 cursor-pointer">
                        <HiMiniXMark className='w-5 h-5' fill='white' />
                    </div>
                    <Image src={imageUrl} width={64} height={64} alt="pro image" className='w-16 h-16' />
                    <h3 className='break-words text-ellipsis text-wrap'>{name}</h3>
                </div>
                <h3><span className='md:hidden'>Price:</span> ${price}</h3>
            </div>
            <div className="flex gap-3 flex-col md:flex-row md:items-center justify-between w-full">
                <div className="relative flex items-center gap-2">

                    <label htmlFor="quantity" className='md:hidden'>Quantity:</label>
                    <input type="number" name='quantity' className='w-20 p-2 focus:outline-none border-2 rounded-md' value={localQuantity} onChange={handleChange} min={1} max={20} />
                    {
                        saveButton && (
                            <Button size='sm' onClick={handleUpdateQuantity} className='bg-green-600 text-xs md:absolute md:translate-x-full md:-right-2 bottom-0'>save</Button>
                        )
                    }
                </div>
                <h3><span className='md:hidden'>Subtotal:</span> ${price * localQuantity}</h3>
            </div>
        </div>
    )
}

export default Card
