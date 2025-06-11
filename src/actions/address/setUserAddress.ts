'use server'

import type { Address } from "@/interfaces"
import prisma from "@/lib/prisma"


export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const addressToSave = await createOrReplaceAddress(address, userId)

        return {
            ok: true,
            message: 'Address saved successfully',
            address: addressToSave
        }

    } catch (error) {
        return {
            ok: false,
            message: 'Error to save address'
        }
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storeAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        const addressToSave = {
            userId: userId,
            firstName: address.firstName,
            lastName: address.lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            city: address.city,
            countryId: address.country,
            phone: address.phone,
        }
        if (!storeAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            })
            return newAddress
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressToSave
        })

        return updatedAddress

    } catch (error) {
        throw new Error('Error to save address')
    }
}