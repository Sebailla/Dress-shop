'use server'

import { PaypalOrderStatusResponse } from "@/interfaces"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export const paypalCheckPayment = async (transactionId: string) => {

    const authToken = await getPaypalBearerToken()
    console.log({ authToken })

    if (!authToken) {
        return {
            ok: false,
            message: 'Paypal token not found'
        }
    }

    const resp = await verifyPaypalPayment(transactionId, authToken)

    if (!resp) {
        return {
            ok: false,
            message: 'Paypal order not found'
        }
    }

    const {status, purchase_units} = resp
    const {invoice_id: orderId} = purchase_units[0]
    console.log({status, purchase_units})


    if (status !== 'COMPLETED' && status !== 'APPROVED') {
        return {
            ok: false,
            message: 'Paypal order not completed'
        }
    }

    //Data base update
    try {
        
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                isPaid: true,
                paidAt: new Date().toISOString(),
            },
        })

        //revaliding path
        revalidatePath(`/orders/${orderId}`)

        return {
            ok: true,
            message: 'Paypal order completed'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Paypal order not payment'
        }
    }

    return {
        ok: true,
        message: 'Paypal order completed'
    }

}

const getPaypalBearerToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    const PAYPAL_SECRET_ID = process.env.PAYPAL_SECRET_ID
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? ''


    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_ID}`,
        "utf-8"
    ).toString("base64");


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
        "Authorization",
        `Basic ${base64Token}`
    );

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const res = await fetch(oauth2Url, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json())
        return res.access_token

    } catch (error) {
        console.log(error)
        return null
    }
}

const verifyPaypalPayment = async (transactionId: string, bearerToken: string): Promise<PaypalOrderStatusResponse | null> => {

    const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`

    const myHeaders = new Headers();
    myHeaders.append(
        "Authorization", 
        `Bearer ${bearerToken}`
    );

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const resp = await fetch( paypalOrderUrl, {
            ...requestOptions,
            cache: 'no-store'
        }).then(r => r.json())
        console.log({resp})
        return resp

    } catch (error) {
        console.log(error)
        return null
    }
}