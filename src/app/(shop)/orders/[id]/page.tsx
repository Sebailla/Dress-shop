import { PaymentState, PaypalButton, Title } from "@/components"
import Image from "next/image"
import clsx from 'clsx';
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

interface Props {
    params: {
        id: string
    }
}

const OrderPage = async ({ params }: Props) => {

    const { id } = params

    //! Call server action getOrderById

    const { order, ok, message } = await getOrderById(id)

    if (!ok) redirect('/')

    const address = order!.OrderAddress
    const items = order!.OrderItem


    return (
        <div className="flex justify-center items-center px-10 sm:px-0">

            <div className="flex flex-col w-[1000px]">

                <Title title={`Order id: ${id.split('-').at(-1)}`} />

                {/* Checkout */}
                <div className=" grid grid-cols-1 sm:grid-cols-2 gap-10">
                    <div className="flex flex-col h-full bg-white rounded-xl shadow-xl p-7">

                        <PaymentState isPaid={order!.isPaid} />

                        <h2 className="text-2xl my-2">Dispatch address</h2>

                        <h4 className="my-2 text-md font-normal">Name order:</h4>

                        <p><span className=" font-semibold text-red-900">{address?.firstName} {address?.lastName}</span> </p>

                        <h4 className="my-2 text-md font-bold">Address</h4>
                        {
                            address?.address2
                                ?
                                (
                                    <p>{address?.address}, {address?.address2} - <span className="mt-2 font-semibold">PC:</span> {address?.postalCode} - {address?.city}, {address?.countryId}</p>
                                )
                                :
                                (
                                    <p>{address?.address} - <span className="mt-2 font-semibold">PC:</span> {address?.postalCode} - {address?.city}, {address?.countryId}</p>
                                )
                        }

                        <p className="mt-2 text-md font-normal">
                            <span className="font-semibold">Phone:</span> {address?.phone}
                        </p>

                    </div>

                    {/* Checkout */}
                    <div className="flex flex-col bg-white rounded-xl shadow-xl p-7 h-fit">

                        <h2 className="text-2xl mb-2">Checkout</h2>
                        <div className="grid grid-cols-2">
                            <span>N° Items</span>
                            <span className="text-right">{order!.totalItems}</span>

                            <span>Subtotal</span>
                            <span className="text-right">{currencyFormat(order!.subTotal)}</span>

                            <span>TAX (21%)</span>
                            <span className="text-right">{currencyFormat(order!.tax)}</span>

                            <span className="mt-5 text-2xl">Total</span>
                            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.total)}</span>
                        </div>
                        <div className="w-full mt-10">
                            {
                                order!.isPaid
                                    ?
                                    (
                                        <PaymentState isPaid={order!.isPaid} />
                                    )
                                    :
                                    (
                                        <PaypalButton
                                            amount={order!.total}
                                            orderId={order!.id}
                                        />
                                    )
                            }
                        </div>
                    </div>
                </div>

                {/* cart */}
                <table className="min-w-full mt-10">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Image
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Product
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Size
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Price
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Quantity
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Subtotal
                            </th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            items.map((item) => (
                                <tr
                                    key={`${item.product.slug}${item.size}`}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        <Image
                                            src={`/products/${item.product.ProductImage[0].url}`}
                                            alt={item.product.title}
                                            width={100}
                                            height={100}
                                            style={{
                                                width: "100px",
                                                height: "100px"
                                            }}
                                            className="mr-5 rounded"
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {
                                            item.product.title
                                        }

                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.size}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(item.price)}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {item.quantity}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(item.price * item.quantity)}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>
        </div >
    )
}

export default OrderPage