"use client"

import { useLoadingPage } from '@/context/LoadingPageContext'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function Backward() {

    const router = useRouter()

    const { setIsPageLoading } = useLoadingPage()

    const onChevronClick = () => {
        setIsPageLoading(true)
        router.push("/admin/dashboard")
        setTimeout(() => {
            setIsPageLoading(false)
        }, 5000);
    }

    // useEffect(() => {
    //     if (!(pathname.startsWith('/admin/dashboard/product/new'))) {
    //         setIsPageLoading(false)
    //     }
    // }, [setIsPageLoading, pathname])

    return (
        <ChevronLeft
            onClick={onChevronClick}
            className="h-5 w-5 cursor-pointer"
        />
    )
}