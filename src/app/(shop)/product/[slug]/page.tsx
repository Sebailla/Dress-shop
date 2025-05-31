import { ProductMobileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from "@/components"
import { bodyFont, titleFont } from "@/config/fonts"
import { initialData } from "@/seed/seed"
import { notFound } from "next/navigation"

interface Props {
    params: {
        slug: string
    }
}

const ProductPage = ({ params }: Props) => {

    const { slug } = params
    const product = initialData.products.find(product => product.slug === slug)

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
                {/* Selector de talla */}
                <SizeSelector
                    selectedSize={product.size[0]}
                    availableSizes={product.size}
                />
                {/* Selector de Cantidad */}
                <QuantitySelector
                    quantity={2}
                />
                {/* button */}
                <button className="btn-primary my-5 w-40">
                    Add to Cart
                </button>

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