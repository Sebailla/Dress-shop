
'use server'

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"


export const registerUser = async (name: string, email: string, password: string) => {
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return {
            ok: true,
            message: 'User created',
            user: newUser
        }

    } catch (error) {
        console.log({error})
        return{
            ok: false,
            message: 'Error to create user'
        }
    }
}