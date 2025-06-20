import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

const privateRoutes = ['/checkout/address', '/checkout','/orders','/profile']
const publicRoutes = ['/']
const authRoutes = ['/auth/login', '/auth/register']
const apiAuthPrefix = '/api/auth'


export default auth((req) => {
    const { nextUrl } = req
    const isLogged = !!req.auth

    //Permite todas las rutas de API de auth
    if (apiAuthPrefix && nextUrl.pathname.startsWith(apiAuthPrefix)) {
        return NextResponse.next()
    }

    // Permitir acceso a rutas públicas sin importar el estado de autenticación
    if (publicRoutes.includes(nextUrl.pathname)) {
        return NextResponse.next();
    }

    // Redirigir a /dashboard si el usuario está logueado y trata de acceder a rutas de autenticación
    if (isLogged && authRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL("/", nextUrl));
    }

    // Redirigir a /login si el usuario no está logueado y trata de acceder a una ruta protegida
    if (
        !isLogged &&
        !authRoutes.includes(nextUrl.pathname) &&
        privateRoutes.includes(nextUrl.pathname)
    ) {
        return NextResponse.redirect(new URL(`/auth/login`, nextUrl));
    }

    return NextResponse.next()
})

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};