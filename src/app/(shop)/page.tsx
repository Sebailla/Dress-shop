import { ProductsGrid, Title } from "@/components";
import { geistSans } from "@/config/fonts";
import { initialData } from "@/seed/seed";


const products = initialData.products


export default function ShopHome() {
  return (
    <div className={`${geistSans.className}`}>
      <Title 
        title="Products Shop"
        subtitle="All your clothing products in one place, come in and enjoy them"
        className="mb-5"
      />
      <ProductsGrid products={products}/>
    </div>
  );
}
