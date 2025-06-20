'use server'

import prisma from '@/lib/prisma'
import { Gender, Product, Size } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const productSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    description: z.string(),
    slug: z.string().min(3).max(255),
    inStock: z.coerce.number().min(0).transform(val => Number(val.toFixed(0))),
    price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
    //gender: z.enum(['men', 'women', 'kid', 'unisex']),
    gender: z.nativeEnum(Gender),
    categoryId: z.string().uuid(),
    tags: z.string(),
    sizes: z.coerce.string().transform(val => val.split(',')),
})


export const createUpdateProduct = async (formData: FormData) => {

    const data = Object.fromEntries(formData)

    const parseProduct = productSchema.safeParse(data)

    if (!parseProduct.success) {
        console.log(parseProduct.error.issues)
        return {
            ok: false
        }
    }

    const product = parseProduct.data

    product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()
    const { id, ...rest } = product

    try {
        //? Prisma transaction
        const prismaTx = await prisma.$transaction(async () => {

            let product: Product
            const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())


            if (id) {
                //? actualizar
                product = await prisma.product.update({
                    where: {
                        id
                    },
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })

            } else {
                //? crear
                product = await prisma.product.create({
                    data: {
                        ...rest,
                        sizes: {
                            set: rest.sizes as Size[]
                        },
                        tags: {
                            set: tagsArray
                        }
                    }
                })
            }

            //?Carga y guardado de Imagenes
            if (formData.getAll('images')) {
                const images = await uploadImages(formData.getAll('images') as File[])
                
                if (!images){
                    throw new Error('Images could not be uploaded')
                }

                await prisma.productImage.createMany({
                    data: images.map((image) => ({
                        url: image!,
                        productId: product.id
                    }))
                })
            }

            return product
        })

        //? Revalidate path
        revalidatePath('/admin/products')
        await Promise.resolve(revalidatePath(`/admin/product/${prismaTx?.slug}`))
        revalidatePath(`/products/${prismaTx?.slug}`)

        return {
            ok: true,
            product: prismaTx
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'Something went wrong'
        }
    }
}



const uploadImages = async (files: File[]) => {

    try {

        const uploadPromises = files.map(async (file) => {

            try {

                const buffer = await file.arrayBuffer()
                const base64File = Buffer.from(buffer).toString('base64')

                return cloudinary.uploader.upload(`data:image/png;base64,${base64File}`)
                    .then(result => {
                        return result.secure_url
                    })

            } catch (error) {
                console.log(error)
                return null
            }
        })

        const uploadedImages = await Promise.all(uploadPromises)

        return uploadedImages

    } catch (error) {
        console.log(error)
        return null
    }

}