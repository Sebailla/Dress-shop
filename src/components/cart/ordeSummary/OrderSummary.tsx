'use client'
import { useCartStore } from '@/store'
import { useState, useEffect } from 'react'
import { currencyFormat } from '../../../utils/currencyFormat';

export const OrderSummary = () => {
    const [loaded, setLoaded] = useState(false)
    const [summaryInfo, setSummaryInfo] = useState({
        subTotal: 0,
        tax: 0,
        total: 0,
        totalItems: 0
    })

    useEffect(() => {
        const info = useCartStore.getState().getSummaryInfo()
        setSummaryInfo(info)
        setLoaded(true)
    }, [])

    // Suscribirse a cambios del carrito
    useEffect(() => {
        const unsubscribe = useCartStore.subscribe((state) => {
            if (loaded) {
                setSummaryInfo(state.getSummaryInfo())
            }
        })
        return unsubscribe
    }, [loaded])

    if (!loaded) return <p>Loading...</p>
    

    return (
        <div className="grid grid-cols-2">
            <span>N° Items</span>
            <span className="text-right">{summaryInfo.totalItems}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(summaryInfo.subTotal)}</span>

            <span>TAX (21%)</span>
            <span className="text-right">{currencyFormat(summaryInfo.tax)}</span>

            <span className="mt-5 text-2xl">Total</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(summaryInfo.total)}</span>
        </div>
    )
}
