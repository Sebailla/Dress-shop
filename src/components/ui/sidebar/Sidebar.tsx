"use client";

import Link from "next/link";
import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import {
    IoCloseOutline,
    IoLogInOutline,
    IoLogOutOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoSearchOutline,
    IoShirtOutline,
    IoTicketOutline,
} from "react-icons/io5";

import { useUiStore } from "@/store";


export const Sidebar = () => {
    const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
    const closeMenu = useUiStore((state) => state.closeSideMenu);

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;
    const isAdmin = session?.user.role === "admin";


    return (
        <div onClick={() => closeMenu()}>
            {/* Background black */}
            {isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-[9999] bg-black opacity-30" />
            )}

            {/* Blur */}
            {isSideMenuOpen && (
                <div
                    onClick={closeMenu}
                    className="fade-in fixed top-0 left-0 w-screen h-screen z-[9999] backdrop-filter backdrop-blur-sm"
                />
            )}

            {/* Sidemenu */}
            <nav
                className={clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-[9999] shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen,
                    }
                )}
            >
                <IoCloseOutline
                    size={50}
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() => closeMenu()}
                />

                {/* Input */}
                <div className="relative mt-14">
                    <IoSearchOutline size={20} className="absolute top-2 left-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>

                {/* Menú */}

                {isAuthenticated && (
                    <>
                        <Link
                            href="/profile"
                            onClick={() => closeMenu()}
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPersonOutline size={30} />
                            <span className="ml-3 text-xl">Profile</span>
                        </Link>

                        <Link
                            href="/orders"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Orders</span>
                        </Link>
                        <button
                            className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                            onClick={() => signOut()}
                        >
                            <IoLogOutOutline size={30} />
                            <span className="ml-3 text-xl">Logout</span>
                        </button>
                    </>
                )}

                {!isAuthenticated && (
                    <Link
                        href="/auth/login"
                        className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        onClick={() => closeMenu()}
                    >
                        <IoLogInOutline size={30} />
                        <span className="ml-3 text-xl">Login</span>
                    </Link>
                )}

                {isAdmin && (
                    <>
                        {/* Line Separator */}
                        <div className="w-full h-px bg-gray-200 my-10" />

                        <Link
                            href="/admin/products"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoShirtOutline size={30} />
                            <span className="ml-3 text-xl">Products</span>
                        </Link>

                        <Link
                            href="/admin/orders"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoTicketOutline size={30} />
                            <span className="ml-3 text-xl">Orders</span>
                        </Link>

                        <Link
                            href="/admin/users"
                            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                        >
                            <IoPeopleOutline size={30} />
                            <span className="ml-3 text-xl">Users</span>
                        </Link>
                    </>
                )}
            </nav>
        </div>
    );
};
