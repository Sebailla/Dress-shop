import type { CartProducts } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProducts[]

    // Methods
    getTotalItems: () => number;
    getSummaryInfo: () => {
        subTotal: number
        tax: number
        total: number
        totalItems: number
    }

    addProductToCart: (product: CartProducts) => void;
    updateProductInCart: (product: CartProducts, quantity: number) => void;
    removeProductInCart: (product: CartProducts) => void;
    clearCart: () => void;
}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            // Methods

            getTotalItems: () => {
                const { cart } = get()
                return cart.reduce((total, item) => total + item.quantity, 0)
            },

            getSummaryInfo: () => {
                const { cart } = get()

                const subTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)

                const tax = subTotal * 0.21
                const total = subTotal + tax

                const totalItems = cart.reduce((total, item) => total + item.quantity, 0)


                return {
                    subTotal,
                    tax,
                    total,
                    totalItems
                }

            },


            addProductToCart: (product: CartProducts) => {

                const { cart } = get()

                // exist Product or create new product
                const existProduct = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                )

                if (!existProduct) {
                    set({ cart: [...cart, product] })
                    return
                }

                // Existe Product and increment quantiy
                const updateProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity }
                    }
                    return item
                })

                set({ cart: updateProduct })
            },

            updateProductInCart: (product: CartProducts, quantity: number) => {

                const { cart } = get()

                const updateProduct = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: quantity }
                    }
                    return item
                })

                set({ cart: updateProduct })
            },

            removeProductInCart: (product: CartProducts) => {
                const { cart } = get()

                const deleteProduct = cart.filter(
                    (item) => !(item.id === product.id && item.size === product.size)
                )

                set({ cart: deleteProduct })
            },

            clearCart: () => {
                set({ cart: [] })
            }

        })
        ,
        {
            name: "shopping-cart",
        }
    )

)