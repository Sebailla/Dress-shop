import { getPaginatedOrders } from "@/actions"
import { Pagination, Title } from "@/components"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import Link from "next/link"
import { redirect } from "next/navigation"
import { IoCardOutline } from "react-icons/io5"

const AdminOrdersPage = async () => {

    const { ok, orders = [] } = await getPaginatedOrders()

    if (!ok) {
        redirect('/auth/login')   
    }
    
    return (
        <>
            <Title title={`Orders Admin`} />

            <div className="mb-10 h-[100dvh]">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                #ID
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Date
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Name
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Amount
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Paid State
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Payment Date
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Order
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                                >

                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id.split('-').at(-1)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {
                                        order.createdAt.toLocaleDateString() 
                                        //!revisar date format
                                        }
                                        
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {order.OrderAddress?.firstName} {order.OrderAddress?.lastName}
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        {currencyFormat(order.total)}
                                    </td>
                                    <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">

                                        <IoCardOutline className={
                                            clsx({
                                                "text-red-500": !order!.isPaid,
                                                "text-green-400": order!.isPaid,
                                            })
                                        } />
                                        <span className={
                                            clsx({
                                                "text-red-500": !order!.isPaid,
                                                "text-green-400": order!.isPaid,
                                            }, "mx-2")
                                        }
                                        >{order?.isPaid ? 'Paid' : 'Pending payment'}
                                        </span>

                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {
                                        order.paidAt?.toLocaleDateString()
                                        //!revisar date format
                                        }
                                        
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 ">
                                        <Link
                                            href={`/orders/${order.id}`}
                                            className="hover:underline"
                                        >
                                            Order...
                                        </Link>
                                    </td>

                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                
                {/* Pagination */}
                <Pagination totalPages={3}/>
            </div>
        </>
    )
}

export default AdminOrdersPage