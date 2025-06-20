'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions"



interface Props {
    orderId: string
    amount: number |undefined
}


export const PaypalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer()

    const roundedAmount = (Math.round(amount! * 100)) / 100

    if (isPending) {
        // Skeleton
        return (
            <div className="animate-pulse w-full mt-10">
                <div className="h-11 bg-gray-200 rounded-md" />
                <div className="h-11 bg-gray-200 rounded-md mt-4" />
                <div className="h-4 w-[50%] mx-auto bg-gray-200 rounded-md mt-3" />
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        value: `${roundedAmount}`,
                        currency_code: 'USD'
                    },
                }
            ]
        })

        //Save transactionId in DataBase
        const { ok } = await setTransactionId(orderId, transactionId)

        if (!ok) throw new Error('Transaction Id not saved')

        return transactionId
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions): Promise<void> => {
        
        const datails = await actions.order?.capture()
        if (!datails) throw new Error('Order not found')

        await paypalCheckPayment(datails.id ?? '')
    }

    // Buttons
    return (
        <div className="w-full mt-10">
            <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
            />
        </div>

    )
}
