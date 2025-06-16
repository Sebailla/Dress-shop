'use client'

import { SessionProvider } from "next-auth/react"
import React from 'react';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";


interface Prop {
    children: React.ReactNode
}

export const Providers = ({ children }: Prop) => {

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
                currency: 'USD',
                intent: 'capture',
                components: 'buttons'
            }}
        >
            <SessionProvider>
                {children}
            </SessionProvider>
        </PayPalScriptProvider>
    )
}
