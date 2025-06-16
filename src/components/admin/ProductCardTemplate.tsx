"use client"

import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
import MoreProductCardButton from './MoreProductCardButton'
import DeleteProductCardButton from './DeleteProductCardButton'
import { ProductInterface } from '@/types/product'
import { Badge } from '../ui/badge'
import { useLoadingPage } from '@/context/LoadingPageContext'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

function ProductTemplate({ name, brand, sizes, price, stock, images, category, style }: ProductInterface) {


    const { setIsPageLoading } = useLoadingPage()

    const router = useRouter()

    const handleEditlick = () => {
        setIsPageLoading(true)
        router.push(`/admin/dashboard/products/${name}/edit`)
    }


    return (
        <div className='flex flex-col rounded-lg border-1 border-gray gap-y-2'>
            <div>
                <div className='relative '>
                    <Image
                        src={images[0]}
                        alt={`${name} image`}
                        height={1000}
                        width={1000}
                        // className='w-full h-full'
                        className=''
                    />

                    <MoreProductCardButton productName={name} />

                </div>
            </div>
            <div className='mx-4 my-3'>
                <div className='flex justify-between'>
                    <h3 className='text-lg font-bold'>{name}</h3>
                    <h4 className='text-lg font-bold'>${price}</h4>
                </div>

                <h3 className='text-sm text-gray-500 capitalize'>{brand}</h3>

                <div className='flex gap-2 my-3'>

                    <Badge
                        className='bg-purple-200 text-purple-700 font-semibold text-center rounded-xl px-3 text-xs'
                    >
                        {category}
                    </Badge>

                    <Badge
                        variant={"secondary"}
                        className='border-gray-300 border-1 font-semibold text-center rounded-xl px-3 text-xs'
                    >
                        {style}
                    </Badge>

                    <Badge
                        className='bg-green-200 text-green-700 font-semibold text-center rounded-xl px-3 text-xs'
                    >
                        {
                            stock > 0 ? "In Stock" : "Out of Stock"
                        }
                    </Badge>
                </div>

                <p className='text-gray-500 leading-5 text-sm'>Stock: {stock} units</p>
                <p className='text-gray-500 leading-5 text-sm'>Sizes: {sizes.join(", ")}</p>

                <div className='flex gap-x-2 my-4'>

                    <Button
                        onClick={handleEditlick}
                        variant={"ghost"}
                        className='flex justify-center items-center gap-3.5 border-1 border-gray-300 rounded-md px-3 py-2 w-[80%] cursor-pointer hover:bg-gray-200'
                    >
                        <Edit size={18} />
                        <p className='text-sm font-semibold'>Edit</p>
                    </Button>

                    <DeleteProductCardButton
                        productName={name}
                        childrenJsx={
                            <div
                                className='flex justify-center border-1 border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-red-100'>
                                <Trash2
                                    size={18}
                                    className='text-red-700'
                                />
                            </div>
                        }
                    />
                </div>

            </div>
        </div>
    )
}

export default ProductTemplate
