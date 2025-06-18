"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Box, Menu, X } from 'lucide-react'


const navbarLinks = [
    {
        title: "men",
        link: "#"
    },
    {
        title: "women",
        link: "#"
    },
    {
        title: "kids",
        link: "#"
    },
    {
        title: "lifestyle",
        link: "#"
    },
    {
        title: "running",
        link: "#"
    },
    {
        title: "basketball",
        link: "#"
    }
]

export default function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (

        // Mobile navbar
        <div className='relative py-4 z-50'>
            <div className='relative flex items-center px-4 py-2'>
                <Button
                    onClick={() => setIsMobileMenuOpen(true)}
                    variant={'ghost'}
                    className='p-2 absolute left-4 bg-gray-300 cursor-pointer'
                >
                    <Menu className="!h-8 !w-8" />
                </Button>

                <h1 className='text-2xl text-black font-bold w-full text-center font-sans'>
                    Nexlo
                </h1>
            </div>

            {
                isMobileMenuOpen && (
                    <div className='absolute flex justify-between top-0 min-w-screen min-h-screen backdrop-blur-sm p-8'>
                        <div className='flex flex-col gap-y-8 text-xl font-semibold'>
                            <Link
                                href={"/"}
                                className='text-2xl text-black font-bold font-sans flex gap-x-2'
                                onClick={() => setIsMobileMenuOpen(false)}

                            >
                                <Box size={32} />
                                <h1>
                                    Nexlo
                                </h1>
                            </Link>
                            {
                                navbarLinks.map(i => (
                                    <Link
                                        href={i.link}
                                        key={i.title}
                                        className='capitalize text-black '
                                    >
                                        {i.title}
                                    </Link>
                                ))
                            }
                        </div>

                        <Button
                            onClick={() => setIsMobileMenuOpen(false)}
                            variant={"ghost"}
                            className='cursor-pointer'
                        >
                            <X className="!h-10 !w-10" />
                        </Button>

                    </div>
                )
            }
        </div>
    )
}
