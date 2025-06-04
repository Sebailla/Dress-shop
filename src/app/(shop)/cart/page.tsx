import { ItemsInCart, OrderSummary, Title } from "@/components"
import Link from "next/link"




const CartPage = () => {

    return (
        <div className="flex justify-center items-center px-0 sm:px-5">

            <div className="flex flex-col w-[1000px]">

                <Title title="Shop Cart" />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

                    {/* cart */}
                    <div className="flex flex-col mt-5 col-span-1 md:col-span-2">
                        <Link
                            href='/'
                            className="mb-10 hover:font-bold cursor-pointer"
                        >
                            <span className="text-xl">Add items</span>
                        </Link>


                        {/* Items */}
                        <ItemsInCart />
                    </div>

                    {/* Checkout */}

                    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
                        <h2 className="text-2xl mb-2">Checkout</h2>

                        <OrderSummary />

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