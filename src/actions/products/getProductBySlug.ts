'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {

    try {

        const product = await prisma.product.findFirst({
            where: {
                slug: slug
            },
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            }
        })

        if (!product) throw new Error('Product not found')

        return {
            ...product,
            images: product.ProductImage.map((image) => image.url),
        }


    } catch (error) {
        throw new Error('Something went wrong' + error)
    }
}