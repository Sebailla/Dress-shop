'use client'

import { SizeSelector, QuantitySelector } from "@/components"
import { CartProducts, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store"
import { useState } from "react"


interface Props {
    product: Product

}

export const Selectors = ({ product }: Props) => {
    // State 
    const addProductToCart = useCartStore((state) => state.addProductToCart)

    const [size, setSize] = useState<Size | undefined>()
    const [quantity, setQuantity] = useState<number>(1)
    const [post, setPost] = useState<boolean>(false)


    const addToCart = () => {

        setPost(true)
        if (!size) return

        const cartProduct: CartProducts = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            size: size,
            quantity: quantity,
            image: product.images[0],
        }

        addProductToCart(cartProduct)

        setPost(false)
        setSize(undefined)
        setQuantity(1)
    }


    return (
        <>

            {/* Selector de talla */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChange={setSize}
                post={post}
            />
            {/* Selector de Cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
            />
            {/* button */}
            <button
                className="btn-primary my-5 w-40"
                onClick={addToCart}
            >
                Add to Cart
            </button>
        </>
    )
}
