"use client"

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function DashboardLinks({mainText, subText, href}: {mainText: string, subText: string, href: string}) {

    const [isLoading, setIsLoading] = useState(false)

    return (
        <Link
            href={href}
            onClick={() => setIsLoading(true)}
        >
            <div className="flex items-center justify-center gap-x-3 rounded-lg border p-4 transition-colors hover:bg-accent">
                {isLoading && <Loader2 className="animate-spin h-8 w-8 mb-2" />}
                <div>
                    <h3 className="font-medium">{mainText}</h3>
                    <p className="text-sm text-muted-foreground">{subText}</p>
                </div>
            </div>
        </Link>
    )
}
