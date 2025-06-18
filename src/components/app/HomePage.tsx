import Image from 'next/image'
import React from 'react'

export default function HomePage() {
    return (
        <div className='fixed inset-0 flex items-center justify-center'>
            <div className='relative'>
                <div className='absolute bottom-20 sm:bottom-28 left-8 sm:left-16 md:bottom-32 md:left-18'>
                    <p className='text-md md:text-lg lg:text-xl font-serif font-extralight -tracking-widest uppercase'>Adjustable</p>
                </div>
            </div>

            <h1 className='text-center text-[84px] sm:text-[150px] md:text-[190px] lg:text-[220px] xl:text-[230px] uppercase font-sans font-extrabold tracking-widest lg:tracking-[0.15em] xl:tracking-[0.25em] text-gray-300'>nexlo</h1>
            <div className='absolute'>
                <Image
                    src={"/assets/home_page_shoe.png"}
                    alt='home_page_shoe'
                    width={1000}
                    height={1000}
                    className='w-96 sm:w-xl md:w-2xl lg:w-3xl 2xl:w-4xl'
                />
            </div>

            <div className='relative'>
                <div className='absolute top-25 -left-21 md:top-38 lg:-left-32 '>
                    <p className='text-md md:text-lg lg:text-xl font-serif font-extralight -tracking-wide uppercase'>Soft Pad</p>
                </div>
            </div>
        </div>
    )
} 