"use client"

import { useLoadingPage } from '@/context/LoadingPageContext'
import { LoaderCircle, Plus } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

function AddProductLink() {

    const [loading, setLoading] = useState(false)

    const { setIsPageLoading } = useLoadingPage()

    const onAddProductClick = () => {
        setLoading(true)
        setIsPageLoading(true)
        setTimeout(() => {
            setIsPageLoading(false)
        }, 3000);
    }

    return (
        <Link
            href={"/admin/dashboard/product/new"}
            className='flex flex-row items-center gap-x-3 bg-black text-white text-xs sm:text-sm font-medium py-2.5 px-3.5 rounded-sm'
            onClick={onAddProductClick}
        >
            {loading ? <LoaderCircle className='mr-1.5 h-6 w-6 animate-spin' /> : <Plus className='mr-1.5 h-4 w-4' />}
            Add Product
        </Link>
    )
}

export default AddProductLink
