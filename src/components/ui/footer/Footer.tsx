import { titleFont } from "@/config/fonts"
import Link from "next/link"


export const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center text-[10px] sm:text-xs py-5 sticky bottom-0 w-full bg-white gap-3">
            <div className="flex">
                <Link
                    href={'/'}
                    className="mx-3"
                >
                    Privacy
                </Link>

                <Link
                    href={'/'}
                    className="mx-3"
                >
                    Terms and Conditions
                </Link>

                <Link
                    href={'/'}
                    className="mx-3"
                >
                    Locations
                </Link>
            </div>

            <Link
                href={'/'}
            >
                <span className={`${titleFont.className} antialiased font-bold`}>- Teslo </span>
                <span>| shop -</span>
                <span> © {new Date().getFullYear()}</span>
            </Link>

        </div>
    )
}
