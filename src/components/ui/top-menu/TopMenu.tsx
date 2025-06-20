'use client'
import { auth } from "@/auth.config"
import { titleFont } from "@/config/fonts"
import { useCartStore, useUiStore } from "@/store"
import Link from "next/link"
import { useEffect, useState } from "react"
import { IoCartOutline, IoSearchOutline } from "react-icons/io5"


export const TopMenu =  async() => {

    const session = await auth()

    const [loaded, SetLoaded]= useState(false)

    useEffect(() => {
        SetLoaded(true)
    }, [])

    const openMenu = useUiStore(state => state.openSideMenu)
    const totalItemsInCart = useCartStore(state => state.getTotalItems())


    return (
        <nav className="flex px-5 justify-between items-center w-full bg-white fixed top-0 z-10">

            {/* Logo */}
            <div>
                <Link
                    href={'/'}
                >
                    <span
                        className={`${titleFont.className} antialiased text-xl font-bold`}
                    >
                        Teslo
                    </span>
                    <span> | Shop</span>
                </Link>
            </div>

            {/* Center Menu */}
            <div className="hidden sm:block">
                <Link
                    href={'/gender/men'}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Hombre
                </Link>
                <Link
                    href={'/gender/women'}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Mujer
                </Link>
                <Link
                    href={'/gender/kid'}
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                >
                    Niño
                </Link>
            </div>

            {/* Serach - cart - menu */}
            <div className="flex items-center">
                <Link
                    href={'/search'}
                    className="mx-2"
                >
                    <IoSearchOutline className="w-7 h-7" />
                </Link>
                <Link
                    href={
                        (totalItemsInCart > 0 && loaded)
                        ?
                        '/cart'
                        :
                        '/empty'
                    }
                    className="mx-2"
                >
                    <div className="relative">
                        {
                            (loaded && totalItemsInCart > 0) &&
                            (
                                <span className="fade-in absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-red-400 text-white"
                                >
                                    {totalItemsInCart}
                                </span>
                            )
                        }
                        <IoCartOutline className="w-7 h-7" />
                    </div>
                </Link>
                <button
                    className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
                    onClick={() => openMenu()}
                >
                    Menu
                </button>
            </div>

        </nav>
    )
}

