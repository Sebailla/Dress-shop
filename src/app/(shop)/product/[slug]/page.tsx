export const revalidate = 604800 // 7 días (segundos)

//--------------------------------------------------------
import { Metadata, ResolvingMetadata } from "next"
import { getProductBySlug } from "@/actions"
import { ProductMobileSlideshow, ProductSlideshow, StockLabel } from "@/components"
import { bodyFont, titleFont } from "@/config/fonts"
import { notFound } from "next/navigation"
import { Selectors } from "./ui/Selectors"

//---------------------------------------------------------
//? Metadata

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const slug = params.slug

    // fetch data
    const product = await getProductBySlug(slug)

    // optionally access and extend (rather than replace) parent metadata
    //const previousImages = (await parent).openGraph?.images || []

    return {
        title: product?.title ?? 'Not Found Product',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Not Found Product',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`],
        },
    }
}

//--------------------------------------------------------

interface Props {
    params: {
        slug: string
    }
}

//--------------------------------------------------------
const ProductPage = async ({ params }: Props) => {

    const { slug } = params

    const product = await getProductBySlug(slug)

    if (!product) notFound()

    return (

        <div className={`${bodyFont} antialiased mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3`}>
            {/* SlideShow */}
            <div className={`antialiased col-span-1 md:col-span-2`}>

                {/* Mobile Slideshow */}
                <ProductMobileSlideshow
                    title={product.title}
                    images={product.images}
                    className="block md:hidden"
                />

                {/* Desktop Slideshow */}
                <ProductSlideshow
                    title={product.title}
                    images={product.images}
                    className="hidden md:block"
                />
            </div>
            {/* Ditails */}
            <div className="col-span-1 px-5">
                <h1
                    className={`${titleFont.className} antialiased text-xl font-bold mb-5`}
                >
                    {product.title}
                </h1>
                <p
                    className={`${titleFont.className} antialiased text-lg mb-5`}
                >
                    $ {product.price}
                </p>

                {/* Stock */}
                <StockLabel slug={product.slug} />

                <Selectors product={product}/>

                {/* Descripcion */}
                <h3 className="text-sm font-bold mb-3">Description</h3>
                <p className="text-sm font-light mb-3">
                    {product.description}
                </p>

            </div>
        </div>
    )
}

export default ProductPage