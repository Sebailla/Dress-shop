import { getCategories, getProductBySlug } from "@/actions"
import { Title } from "@/components"
import { redirect } from "next/navigation"
import { ProductForm } from "./ui/ProductForm"


interface Props {
    params: {
        slug: string
    }
}

const ProductPage = async ({ params }: Props) => {

    const { slug } = params

    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ])


    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }

    const title = (slug === 'new') ? 'New Product' : 'Product Edit'


    return (
        <div className="mb-10 h-[100dvh]">
            <Title title={title} />
            <ProductForm product={product ?? {}} categories={categories} />
        </div>
    )
}

export default ProductPage