import { Title } from "@/components"
import { initialData } from "@/seed/seed"
import Image from "next/image"
import Link from "next/link"

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

const CheckoutPage = () => {
    return (
        <div className="flex justify-center items-center px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title="Verify Order" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

                    {/* cart */}
                    <div className="flex flex-col mt-5">
                        <Link
                            href='/cart'
                            className="underline mb-5"
                        >
                            <span className="text-xl">Edit items</span>
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
                                            <p className="font-bold">$ {product.price} x 3</p>
                                            <p className="font-bold">Subtotal: $ {product.price * 3}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {/* Checkout */}
                    <div className="bg-white rounded-xl shadow-xl p-7">

                        <h2 className="text-2xl mb-2">Dispatch address</h2>
                        <div className="mb-10">
                            <p>Sebastián Illa</p>
                            <p>Av. Siempre viva 123</p>
                            <p>San José, Costa Rica</p>
                            <p>CP: 23234</p>
                        </div>
                        {/* Divider line */}
                        <div
                            className="w-full h-0.5 bg-gray-200 mb-10 rounded"
                        ></div>

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

                        <div className="mt-10">
                            <p className="mb-5 text-center">
                                <span className="text-xs">
                                    By clicking "Order," you agree to our <a href="#" className="font-bold">terms and conditions</a> of use and our data<a href="#" className="font-bold"> privacy policies</a>.
                                </span>
                            </p>
                            <Link
                                href='/orders/123'
                                className="flex btn-primary justify-center mt-5 mb-2 w-full"
                            >
                                Order
                            </Link>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default CheckoutPage