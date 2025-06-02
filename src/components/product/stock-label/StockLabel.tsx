'use client'
import { getStockBySlug } from "@/actions"
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react"

interface Props {
    slug: string
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getStock()
    }, [])

    const getStock = async () => {
        const stock = await getStockBySlug(slug)
        setStock(stock)
        setLoading(false)
    }

    return (
        <>
            {
                loading
                    ?
                    (
                        <h3
                            className={`${titleFont.className} antialiased text-md mt-5`}
                        >
                            {/* Skeleton */}
                            Stock: <span className="font-bold  bg-gray-200 animate-pulse ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </h3>
                    )
                    :
                    (
                        <h3
                            className={`${titleFont.className} antialiased text-md mt-5`}
                        >
                            Stock:
                            {
                                stock === 0
                                    ?
                                    (
                                        <span className="font-bold text-red-500"> Out of stock</span>
                                    )
                                    :
                                    (
                                        <span className="font-bold"> {stock}</span>
                                    )
                            }

                        </h3>
                    )
            }
        </>

    )
}
