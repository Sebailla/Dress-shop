'use client'

import { SessionProvider } from "next-auth/react"
import React from 'react';

interface Prop {
    children: React.ReactNode
}

export const Provider = ({ children }: Prop) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
