'use client'

import { useAddressStore, useCartStore } from "@/store"
import { useEffect, useState } from "react"
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { placeOrder } from "@/actions";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {

    const router = useRouter()

    const [loaded, setLoaded] = useState(false)
    const [isGenerateOrder, setIsGenerateOrder] = useState(false)
    const [error, setError] = useState('')

    const address = useAddressStore((state) => state.address)
    const cart = useCartStore((state) => state.cart)
    const clearCart = useCartStore((state) => state.clearCart)


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

    const onGeneratOrder = async () => {
        setIsGenerateOrder(true)

        const productsInOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }))

        const resp = await placeOrder(productsInOrder, address)
        if (!resp.ok) {
            setIsGenerateOrder(false)
            setError(resp.message)
            return
        }

        clearCart()

        setIsGenerateOrder(false)

        router.replace(`/orders/${resp.order?.id}`)
    }


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
        <div className="bg-white rounded-xl shadow-xl p-7 h-fit">

            {/* dispach address */}
            <h2 className="text-2xl mb-2">Dispatch address</h2>
            <div className="mb-10">
                <p className="mb-2 text-md font-bold">{address.firstName} {address.lastName}</p>
                <p>{address.address}</p>
                <p>{address.address2}</p>
                <p><span className="mt-2 font-semibold">PC:</span> {address.postalCode}</p>
                <p>{address.city}, {address.country}</p>
                <p><span className="font-semibold">Phone:</span> {address.phone}</p>
            </div>

            {/* Divider line */}
            <div
                className="w-full h-0.5 bg-gray-200 mb-10 rounded"
            ></div>

            {/* Checkout */}
            <h2 className="text-2xl mb-2">Checkout</h2>
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

            <div className="mt-10">
                <p className="mb-5 text-center">
                    <span className="text-xs">
                        By clicking Order, you agree to our <a href="#" className="font-bold">terms and conditions</a> of use and our data<a href="#" className="font-bold"> privacy policies</a>.
                    </span>
                </p>

                <p className="text-red-500">{error}</p>

                <button
                    //href='/orders/123'
                    onClick={onGeneratOrder}
                    disabled={isGenerateOrder}
                    className={
                        clsx({
                            'btn-primary': !isGenerateOrder,
                            'btn-disabled': isGenerateOrder,
                        }, 'w-full')
                    }
                >
                    Order
                </button>
            </div>
        </div >
    )
}
