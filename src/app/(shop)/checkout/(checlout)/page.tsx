import { Title } from "@/components"
import Link from "next/link"
import { ItemsInCart } from "./ui/ItemsInCart"
import { PlaceOrder } from "./ui/PlaceOrder"

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
                        <ItemsInCart />
                    </div>

                    {/* Checkout */}

                    <PlaceOrder />

                </div>

            </div>
        </div>
    )
}

export default CheckoutPage