'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getPaginatedOrders = async () => {

    const session = await auth()

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Unauthorized User'
        }
    }

    try {

        const orders = await prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        quantity: true,
                        price: true,
                        size: true,
                    }
                }
            }
        })

        return {
            ok: true,
            orders
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Order not found'
        }
    }
}