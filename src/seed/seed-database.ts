import prisma from '../lib/prisma'
import { initialData } from './seed'

async function main() {

    //? Clear database
        await prisma.productImage.deleteMany()
        await prisma.product.deleteMany()
        await prisma.category.deleteMany()
        await prisma.user.deleteMany()


    const { categories, products, users } = initialData

    //? User insert
    await prisma.user.createMany({
        data: users
    })

    //? Category insert
    const categoryData = categories.map(category => ({
        name: category
    }))
    await prisma.category.createMany({
        data: categoryData
    })

    //relaciones
    const categoriesBD = await prisma.category.findMany()

    const categoriesMap = categoriesBD.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id
        return map
    }, {} as Record<string, string>) //<string=name, string=categoryId>

    //? Product insert
    products.forEach(async product => {
        const { type, images, ...rest } = product
        
        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type]
            }
        })

        //? productImage insert
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))
        await prisma.productImage.createMany({
            data: imagesData
        })
    })

    console.log('Seed executed successfully')
}

(async () => {
    if (process.env.NODE_ENV === 'production') return
    await main()
})()