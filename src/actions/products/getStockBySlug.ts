'use server'

import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string) => {

    try {

        //await sleep(3)

        const stock = await prisma.product.findFirst({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        })

        return stock?.inStock || 0

    } catch (error) {
        console.log(error)
        return 0
    }


}