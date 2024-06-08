import React from 'react'
import SecTitle from '../_components/SecTitle'
import { getCategories } from '@/app/api/category'
import CategoryCard from '../_components/CategoryCard'

const Categories = async () => {


    const categoriesData = await getCategories()

    const categories = categoriesData?.data?.map((cate, idx) => {
        return <CategoryCard key={idx} {...cate} />
    })

    return (
        <>
            <div className="pb-28">
                <SecTitle T_title='Categories' B_title='Browse By Category' />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {categories}
                </div>
            </div>
        </>
    )
}

export default Categories