'use server'

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
}


export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth()
    const userId = session?.user.id

    // User Verify
    if (!userId) {
        return {
            ok: false,
            message: 'User not found'
        }
    }

    // Product information
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(product => product.productId)
            }
        }
    })

    const itemsInOrders = productIds.reduce((count, p) => count + p.quantity, 0)

    const { subTotal, tax, total } = productIds.reduce(
        (totals, item) => {
            const productQuantity = item.quantity;
            const product = products.find((product) => product.id === item.productId);

            if (!product) throw new Error(`${item.productId} no existe - 500`);

            const subTotal = product.price * productQuantity;

            totals.subTotal += subTotal;
            totals.tax += subTotal * 0.21;
            totals.total += subTotal * 1.21;

            return totals;
        },
        { subTotal: 0, tax: 0, total: 0 }
    )

    //? BD transaction (3 steps)

    try {

        const prismaTx = await prisma.$transaction(async (tx) => {

            // 1. Upload product stock
            const updateProductsPromises = products.map((product) => {
                //Acumilar Valores
                const productsQuantity = productIds.filter(p => p.productId === product.id).reduce((count, item) => count + item.quantity, 0)

                if (!productsQuantity) {
                    throw new Error(`${product.id} has no defined quantity}`)
                }
                // Retornamos transaccion para actualizar inStock
                return tx.product.update({
                    where: {
                        id: product.id
                    },
                    data: {
                        inStock: {
                            decrement: productsQuantity
                        }
                    }
                })

            })

            const updateProducts = await Promise.all(updateProductsPromises)

            // Verificar valores negativos en InStock
            updateProducts.forEach(product => {
                if (product.inStock < 0) {
                    throw new Error(`${product.title} It's out of stock`)
                }
            })

            // 2. Create Order and datails (header)
            const order = await tx.order.create({
                data: {
                    userId: userId,
                    totalItems: itemsInOrders,
                    subTotal: subTotal,
                    tax: tax,
                    total: total,

                    OrderItem: {
                        createMany: {
                            data: productIds.map(product => ({
                                productId: product.productId,
                                quantity: product.quantity,
                                size: product.size,
                                price: products.find(p => p.id === product.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            })
            //Validar si el precio da 0, arojar un error

            // 3. Create Order address
            const { country, ...restAddress } = address

            const orderAddress = await tx.orderAddress.create({
                data: {
                    firstName: restAddress.firstName,
                    lastName: restAddress.lastName,
                    address: restAddress.address,
                    address2: restAddress.address2,
                    postalCode: restAddress.postalCode,
                    city: restAddress.city,
                    phone: restAddress.phone,
                    countryId: country,
                    orderId: order.id
                }
            })

            return {
                order: order,
                orderAddress: orderAddress,
                updateProducts: updateProducts
            }
        })

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx
        }

    } catch (error: any) {
        return {
            ok: false,
            message: error.message || 'Something went wrong'
        }
    }
}