'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderByUser = async () => {

    const session = await auth()
    const userId = session!.user.id

    if (!session?.user) {
        return {
            ok: false,
            message: 'Unauthorized User'
        }
    }

    try {

        const orders = await prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        quantity: true,
                        price: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
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