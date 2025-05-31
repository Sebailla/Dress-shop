import { titleFont } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"


export const PageNotFound = () => {
    return (
        <section
        className="flex flex-col h-screen w-full items-center justify-center align-middle bg-white"
        >
            {/* <div
            className="text-center px-5 py-5"
            >
                <h1 className={`${titleFont.className} antialiased text-8xl text-red-400 font-bold`}>404</h1>
                <p className="text-2xl font-semibold">Page Not Found</p>
                <p className=""> 
                    <span>Back to </span>
                    <Link 
                    href="/"
                    className="font-normal hover:underline transition-all"
                    >
                        Home
                    </Link>
                </p>
            </div> */}

            <div className="mx-5 px-5">
                <Image
                src="/imgs/404-2.jpg"
                alt="Starman"
                width={550}
                height={550}
                className="p-5 sm:p-0"
                />
            </div>
            <div>
                <p className={`${titleFont} text-2xl font-semibold`}> 
                    <span>Back to </span>
                    <Link 
                    href="/"
                    className="font-normal hover:underline transition-all"
                    >
                        Home
                    </Link>
                </p>
            </div>
            
        </section>
    )
}

