'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getOrderById = async (id: string) => {

    const session = await auth()

    if (!session?.user) {
        return {
            ok: false,
            message: 'Unauthorized User'
        }
    }

    try {

        const order = await prisma.order.findUnique({
            where: {
                id
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

        if (!order) {
            return {
                ok: false,
                message: `Order with ${id}, not found`
            }
        }

        if (session.user.role === 'admin') {
            if (session.user.id !== order.userId) {
                return {
                    ok: false,
                    message: 'Unauthorized User'
                }
            }
        }

        return {
            ok: true,
            order
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Order not found'
        }
    }
}