'use server'

import prisma from "@/lib/prisma"

export const setTransactionId = async (orderId: string, transactionId: string) => {
    
    try {
        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                transactionId
            }
        })

        if(!order) throw new Error(`Order ${orderId}, not found`)

        return {
            ok: true,
            message: 'Transaction Id saved'
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Transaction Id not saved'
        }
    }
}