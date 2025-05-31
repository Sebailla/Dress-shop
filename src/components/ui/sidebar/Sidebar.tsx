'use client'
import { useUiStore } from "@/store"
import clsx from "clsx"
import Link from "next/link"
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"


export const Sidebar = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen)
    const closeMenu = useUiStore(state => state.closeSideMenu)

    return (
        <div className="">

            {
                isSideMenuOpen &&
                /* Black background */
                (
                    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />

                )
            }

            {
                isSideMenuOpen &&
                (
                    /* Blur */
                    <div className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-[1.5px]" />
                )
            }



            {/* Side Menu */}
            <nav className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )
            }>

                <IoCloseOutline
                    size={30}
                    className="absolut top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* search Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Search"
                        className="w-full bd-gray-50 py-1 pl-10 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-400"
                    />
                </div>

                {/* Menu */}
                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoPersonOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Profail</span>
                </Link>

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Order</span>
                </Link>

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoLogInOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Login</span>
                </Link>

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoLogOutOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Logout</span>
                </Link>

                {/* Line separator */}
                <div className="w-full h-px my-10 bg-gray-200" />

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoShirtOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Products</span>
                </Link>

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoTicketOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Orders</span>
                </Link>

                <Link
                    href={"/"}
                    onClick={() => closeMenu()}
                    className="flex items-center mt-10 p-2 hover: bg-gray-100 rounded transition-all"
                >
                    <IoPeopleOutline size={30} className="mr-2" />
                    <span className="ml-3 text-xl">Users</span>
                </Link>

            </nav>
        </div>
    )
}
