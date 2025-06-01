
//? Revalidacion de rutas del lado del servidor:
export const revalidate = 60 // 60 segundos
//-----------------------------------------

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductsGrid, Title } from "@/components";
import { geistSans } from "@/config/fonts";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ShopHome({ searchParams }: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect(`/?page=${totalPages}`)
  }

  return (
    <div className={`${geistSans.className}`}>
      <Title
        title="Products Shop"
        subtitle="All your clothing products in one place, come in and enjoy them"
        className="mb-5"
      />
      <ProductsGrid products={products} />
      <Pagination totalPages={totalPages}/>
    </div>
  );
}
