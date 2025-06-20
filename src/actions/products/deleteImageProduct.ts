'use server'

import prisma from "@/lib/prisma"
import { v2 as cloudinary } from 'cloudinary'
import { revalidatePath } from "next/cache";

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


export const deleteImageProduct = async (imageId: number, imageUrl: string) => {

    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            message: 'Invalid image url'
        }
    }

    const imageName = imageUrl.split('/').pop()?.split('.')[0]

    try {

        await cloudinary.uploader.destroy(imageName!)

        const delImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        //? Revalidate path
        revalidatePath('/admin/products')
        await Promise.resolve(revalidatePath(`/admin/product/${delImage.product?.slug}`))
        revalidatePath(`/products/${delImage.product?.slug}`)

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Image could not be deleted'
        }
    }

    return {
        ok: true
    }
}
