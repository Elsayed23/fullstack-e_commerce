import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen overflow-hidden flex items-center justify-center bg-black fixed w-full top-0 left-0 z-50'>
            <Loader size={80} className='animate-spin' color='white' />
        </div>
    )
}

export default Loading