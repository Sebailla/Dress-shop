
import Image from "next/image"

interface Props{
    src?: string
    alt: string
    width?: number
    height?: number
    style?: React.CSSProperties
    onMouseEnter?: React.MouseEventHandler<HTMLImageElement>
    onMouseLeave?: React.MouseEventHandler<HTMLImageElement>
    className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
}

export const ProductImage = ({src, alt, width, height, className,style, onMouseEnter, onMouseLeave}:Props) => {

    const newSrc = (src) ? src.startsWith('http') ? src : `/products/${src}` : '/imgs/placeholder.jpg'


    return (

        <Image
            src={newSrc}
            alt={alt}
            width={width}
            height={height}
            style={style}
            className={className}
            onMouseLeave={onMouseEnter}
            onMouseEnter={onMouseLeave}
        />
    )
}
