"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Edit, Eye, MoreHorizontal, Trash2 } from 'lucide-react'
import DeleteProductCardButton from './DeleteProductCardButton'
import { useLoadingPage } from '@/context/LoadingPageContext'
import { usePathname, useRouter } from 'next/navigation'

function MoreProductCardButton({ productName }: { productName: string }) {
    const [isMoreClicked, setIsMoreClicked] = useState(false)

    const pathname = usePathname()
    console.log("pathname: ", pathname);
    

    const onIsMoreClicked = () => {
        setIsMoreClicked(!isMoreClicked)
    }

    const { setIsPageLoading } = useLoadingPage()

    const router = useRouter()

    const handleViewClick = () => {
        setIsPageLoading(true)
        router.push(`/admin/dashboard/products/${productName}`)
        setIsMoreClicked(false)
    }

    const handleEditlick = () => {
        setIsPageLoading(true)
        router.push(`/admin/dashboard/products/${productName}/edit`)
        setIsMoreClicked(false)
    }

    useEffect(() => {
      if (!(pathname.startsWith('/admin/dashboard/products/'))) {
        setIsPageLoading(false)
      }
    }, [setIsPageLoading, pathname])
    

    return (
        <div>
            <div className='absolute right-3 top-2'>
                <Button
                    variant={'ghost'}
                    className='text-center bg-muted-foreground text-muted hover:bg-muted-foreground hover:text-muted rounded-md py-2 px-2 cursor-pointer'
                    onClick={onIsMoreClicked}
                >
                    <MoreHorizontal size={16} />
                </Button>
            </div>

            {isMoreClicked &&
                <div className='absolute right-3 top-12'>
                    <div className='bg-white flex flex-col text-black px-1 py-2 rounded-md shadow-xl'>

                        <div
                            onClick={handleViewClick}
                            className='flex gap-3 py-1 px-2 items-center hover:bg-gray-300 rounded-sm cursor-pointer'
                        >

                            <Eye size={18} />
                            <p className=' pr-8 text-sm'>View</p>
                        </div>

                        <div
                            onClick={handleEditlick}
                            className='flex gap-3 py-1 px-2 items-center hover:bg-gray-300 rounded-sm cursor-pointer'
                        >
                            <Edit size={16} />
                            <p className=' pr-8 text-sm'>Edit</p>
                        </div>


                        <DeleteProductCardButton
                            productName={productName}
                            childrenJsx={
                                <div className='flex gap-3 py-1 px-2 items-center hover:bg-red-100 rounded-sm cursor-pointer'>
                                    <Trash2 size={16} className='text-red-600' />
                                    <p className=' pr-8 text-sm text-red-600'>Delete</p>
                                </div>
                            }
                        />

                    </div>
                </div >
            }
        </div>
    )
}

export default MoreProductCardButton
