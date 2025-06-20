'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export const roleChange = async (id: string, role: string) => {

    const session = await auth()

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Unauthorized User'
        }
    }

    try {

        const newRole = role === 'admin' ? 'admin' : 'user'

        const users = await prisma.user.update({
            where: {
                id
            },
            data: {
                role: newRole
            }
        })

        revalidatePath('/admin/users')

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