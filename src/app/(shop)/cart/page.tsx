import { QuantitySelector, Title } from "@/components"
import { initialData } from "@/seed/seed"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { IoTrashBinOutline } from "react-icons/io5"

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]


const CartPage = () => {

    if (productsInCart.length === 0){
        redirect('/empty')
    }

    return (
        <div className="flex justify-center items-center px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title="Shop Cart" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* cart */}
                    <div className="flex flex-col mt-5">
                        <Link
                            href='/'
                            className="underline mb-5"
                        >
                            <span className="text-xl">Add items</span>
                        </Link>


                        {/* Items */}
                        {
                            productsInCart.map((product) => (
                                <div key={product.slug} className="flex mb-5">
                                    <Image
                                        src={`/products/${product.images[0]}`}
                                        alt={product.title}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: "100px",
                                            height: "100px"
                                        }}
                                        className="mr-5 rounded"
                                    />
                                    <div>
                                        <div className="">
                                            <p>{product.title}</p>
                                            <p className="font-bold">$ {product.price}</p>
                                        </div>
                                        <div className="flex justify-start items-center gap-10 mt-5">
                                            <QuantitySelector quantity={1} />
                                            <button>
                                                <IoTrashBinOutline size={25} className="text-red-400 hover:text-red-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Checkout</h2>
                        <div className="grid grid-cols-2">
                            <span>N° Items</span>
                            <span className="text-right">1</span>

                            <span>Subtotal</span>
                            <span className="text-right">$ 100</span>

                            <span>TAX (21%)</span>
                            <span className="text-right">$ 21</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">$ 121</span>
                        </div>

                        <div className="flex btn-primary justify-center mt-5 mb-2 w-full">
                            <Link href='/checkout/address'>
                                Checkout
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CartPage