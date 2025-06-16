import { adminDeleteProduct } from '@/lib/axios-api/admin/adminDeleteProduct'
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
                {childrenJsx}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete &quot;{productName}&quot;? This action cannot be undone.
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
