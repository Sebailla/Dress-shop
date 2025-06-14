'use client'

import Image from 'next/image'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'


export const ItemsInCart = () => {

    const productsInCart = useCartStore((state) => state.cart)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }


    return (
        <>
            {
                productsInCart.map((product) => (
                    <div key={`${product.slug}-${product.size}`} className="flex flex-col mb-5 rounded-xl border-gray-200 shadow-md p-5">
                        <div className="flex gap-[5px] flex-row items-start">
                            <div className="h-auto w-25">
                                <Image
                                    src={`/products/${product.image}`}
                                    alt={product.title}
                                    width={100}
                                    height={100}
                                    style={{
                                        width: "100px",
                                        height: "100px"
                                    }}
                                    className="mr-5 rounded"
                                />
                            </div>
                            <div className="h-auto grow">
                                <p>{product.title}</p>
                                <p>Size: <span className='font-bold'>{product.size}</span></p>
                                <p>Quantity: <span className='font-bold' > {product.quantity}</span></p>
                                <p>Subtotal: <span className='font-bold' > {currencyFormat(product.price * product.quantity)}</span></p>
                            </div>
                            <div className="h-auto text-right">
                                <p>{currencyFormat(product.price * product.quantity)}</p>
                            </div>
                        </div>
                    </div>

                ))
            }
        </>
    )
}
