import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const SecSwiper = ({ children }) => {
    return (
        <Carousel>
            <div className="flex justify-end gap-4 mb-8 absolute -top-8 right-0 -translate-y-full">
                <CarouselPrevious className='relative top-0 right-0 left-0 translate-x-0 translate-y-0  w-12 h-12' />
                <CarouselNext className='relative top-0 right-0 left-0 translate-x-0 translate-y-0  w-12 h-12' />
            </div>
            <CarouselContent>
                {children}
            </CarouselContent>

        </Carousel>
    )
}

export default SecSwiper