import { titleFont } from "@/config/fonts";

interface Props {
    title: string;
    subtitle?: string;
    className?: string
}


export const Title = ({ title, subtitle, className}: Props) => {
    return (
        <div className={`${className} mt-3 `}>
            <h1 className={`${titleFont.className} antialiased, text-4xl font-semibold mt-10 mb-5 capitalize`}>{title}</h1>
            {
                subtitle && (
                    <h3 className="text-xl mb-10">{subtitle}</h3>
                )
            }

        </div>
    )
}

