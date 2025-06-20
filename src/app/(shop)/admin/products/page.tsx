import { getPaginatedProductsWithImages } from "@/actions"
import { Pagination, ProductImage, Title } from "@/components"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { redirect } from "next/navigation"



interface Props {
    searchParams: {
        page?: string
    }
}

const AdminProductsPage = async ({ searchParams }: Props) => {

    const page = searchParams.page ? parseInt(searchParams.page) : 1

    const { products, totalPages } = await getPaginatedProductsWithImages({ page })

    if (products.length === 0) {
        redirect(`/?page=${totalPages}`)
    }

    return (
        <>
            <Title title={`Products Admin`} />

            <div className="mb-5 flex justify-end">
                <Link
                    href={'/admin/product/new'}
                    className="btn-primary"
                >
                    New Product
                </Link>
            </div>

            <div className="mb-10 h-[100dvh]">
                <table className="min-w-full">
                    <thead className="bg-gray-200 bp-b">
                        <tr>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                Title
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                Size
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-left">
                                Gender
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">
                                Stock
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-right">
                                Price
                            </th>
                            <th scope="col" className="text-md font-medium text-gray-900 px-6 py-4 text-center">
                                Image
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            products.map((p) => (
                                <tr
                                    key={p.id}
                                    className="bg-white bp-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {p.id.split('-').at(-1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        <Link href={`/admin/product/${p.slug}`} className="hover:underline"
                                        >
                                            {p.title}
                                        </Link>
                                    </td>
                                    <td className="text-sm text-gray-900 font-semibold px-6 py-4 whitespace-nowrap">
                                        {p.sizes.join(' - ')}
                                    </td>
                                    <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                        {p.gender}
                                    </td>
                                    <td className={
                                        clsx({
                                            "text-red-500": p.inStock === 0,
                                            "text-gray-900": p.inStock > 0,
                                        }, " font-semibold px-6 py-4 whitespace-nowrap text-center")}>
                                        {p.inStock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                                        {currencyFormat(p.price)}
                                    </td>
                                    <td className="text-sm text-gray-900 flex justify-center items-center">
                                        <Link href={`/product/${p.slug}`}>
                                            <ProductImage
                                                src={p.ProductImage[0]?.url}
                                                alt={p.title}
                                                width={100}
                                                height={100}
                                                className="w-20 h-20 rounded object-cover p-2"
                                            />
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>


            </div>

            {/* Pagination */}
            <Pagination totalPages={totalPages} />
        </>
    )
}

export default AdminProductsPage