
//? Revalidacion de rutas del lado del servidor:
export const revalidate = 60 // 60 segundos
//-----------------------------------------

import { getPaginatedProductsWithImages } from "@/actions"
import { Pagination, ProductsGrid, Title } from "@/components"
import { geistSans } from "@/config/fonts"
import { Gender } from "@prisma/client"
import { redirect } from "next/navigation"

interface Props {
    params: {
        gender: string
    },
    searchParams: {
        page?: string

    }
}

const CategoryPage = async ({ params, searchParams }: Props) => {

    const { gender } = params

    const page = searchParams.page ? parseInt(searchParams.page) : 1

    const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender })

    if (products.length === 0) {
        redirect(`/gender/${gender}`)
    }


    return (
        <div className={`${geistSans.className}`}>
            <Title
                title={`${gender}'s Productos`}
                subtitle="Find all the products you need here"
                className="mb-5"
            />
            <ProductsGrid products={products} />

            <Pagination totalPages={totalPages} />
        </div>
    )

}

export default CategoryPage