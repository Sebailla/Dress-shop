import { Inter, Montserrat_Alternates, Poppins } from "next/font/google";
import localFont from "next/font/local";


export const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
export const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const inter = Inter({
    subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({
    subsets: ["latin"],
    weight: ["500", "700"],
});

export const bodyFont = Poppins({
    subsets: ["latin"],
    weight: ["400", "700"],
})

