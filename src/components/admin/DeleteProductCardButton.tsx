import { adminDeleteProduct } from '@/lib/axios-api/admin/adminDeleteProduct'
import { Trash2 } from 'lucide-react'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

function DeleteProductCardButton({ productName, childrenJsx }: { productName: string, childrenJsx: React.ReactNode }) {

    const onDeleteClicked = (name: string) => {
        adminDeleteProduct(name)
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                {/* <div
                    className='flex justify-center border-1 border-gray-300 rounded-md px-3 py-2 cursor-pointer hover:bg-red-100'>
                    <Trash2
                        size={18}
                        className='text-red-700'
                    />
                </div> */}
                {childrenJsx}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{productName}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        className='cursor-pointer'
                    >Cancel</AlertDialogCancel>

                    <AlertDialogAction
                        className='cursor-pointer bg-red-600 hover:bg-red-700'
                        onClick={() => onDeleteClicked(productName)}
                    >Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProductCardButton
