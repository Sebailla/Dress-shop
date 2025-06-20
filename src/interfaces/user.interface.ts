export interface User{
    id: string
    name: string
    email: string
    emailVerified?: Date | null
    image?: string | null
    password: string
    role: string
}