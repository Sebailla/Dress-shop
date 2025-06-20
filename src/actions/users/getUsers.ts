'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"

export const getUsers = async () => {

    const session = await auth()

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Unauthorized User'
        }
    }

    try {

        const users = await prisma.user.findMany({
            orderBy: {
                name: 'desc'
            },
        })

        return {
            ok: true,
            users
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: 'User not found'
        }
    }
}