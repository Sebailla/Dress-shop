'use client'
import { IoTrashBinOutline } from 'react-icons/io5'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { QuantitySelector } from '@/components'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { currencyFormat } from '@/utils'


export const ItemsInCart = () => {

    const productsInCart = useCartStore((state) => state.cart)
    const updateProductInCart = useCartStore((state) => state.updateProductInCart)
    const removeProductInCart = useCartStore((state) => state.removeProductInCart)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])

    if (!loaded) {
        return <p>Loading...</p>
    }



    return (
        <>
            {/* {
                productsInCart.map((product) => (
                    <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                        <Link
                            href={`/product/${product.slug}`}
                            className='cursor-pointer'
                        >
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
                        </Link>
                        <div>
                            <div className="flex flex-col gap-2">
                                <Link
                                    href={`/product/${product.slug}`}
                                    className='cursor-pointer hover:text-red-400'
                                >
                                    <p>{product.title}</p>
                                </Link>
                                <p className="font-bold">$ {product.price} <span className='font-normal'>- Size:</span> {product.size}</p>
                                <p></p>
                            </div>
                            <div className="flex justify-start items-center gap-10 mt-5">
                                <QuantitySelector
                                    quantity={product.quantity}
                                    onQuantityChange={quantity => updateProductInCart(product, quantity)}
                                />
                                <button
                                    onClick={() => removeProductInCart(product)}
                                >
                                    <IoTrashBinOutline size={25} className="text-red-400 hover:text-red-600" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            } */}

            {
                productsInCart.map((product) => (
                    <div key={`${product.slug}-${product.size}`} className="flex flex-col mb-5 rounded-xl border-gray-200 shadow-md p-5">
                        <div className="flex gap-[5px] flex-wrap flex-row items-start">
                            <div className="h-auto w-25">
                                <Link
                                    href={`/product/${product.slug}`}
                                    className='cursor-pointer'
                                >
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
                                </Link>
                            </div>
                            <div>

                            </div>
                            <div className="h-auto grow">
                                <p>{product.title}</p>
                                <p>Size: <span className='font-bold'>{product.size}</span></p>
                                <p className='font-bold'>{currencyFormat(product.price)}</p>
                                <div className="flex justify-start items-center gap-10 mt-5">
                                    <QuantitySelector
                                        quantity={product.quantity}
                                        onQuantityChange={quantity => updateProductInCart(product, quantity)}
                                    />
                                    <button
                                        onClick={() => removeProductInCart(product)}
                                    >
                                        <IoTrashBinOutline size={25} className="text-red-400 hover:text-red-600" />
                                    </button>
                                </div>

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
