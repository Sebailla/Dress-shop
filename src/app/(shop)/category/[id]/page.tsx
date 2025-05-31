import { ProductsGrid, Title } from "@/components"
import { geistSans } from "@/config/fonts"
import { Product } from "@/interfaces"
import { initialData } from "@/seed/seed"



interface Props {
    params: {
        id: string
    },
}

const seedProducts = initialData.products

const CategoryPage = ({ params }: Props) => {

    const { id } = params

    /* if (id === 'kids') {
        notFound()
    } */

    const products = seedProducts.filter(product => product.gender === id)

    return (
        <div className={`${geistSans.className}`}>
            <Title
                title={`${id}'s Productos`}
                subtitle="Find all the products you need here"
                className="mb-5"
            />
            <ProductsGrid products={products} />
        </div>
    )

}

export default CategoryPage