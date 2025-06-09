"use client";

import { useEffect } from 'react';
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";

import { authenticate } from "@/actions";
import { IoWarningOutline } from "react-icons/io5";
import clsx from 'clsx';
import { signIn } from '@/auth.config';


export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);

    console.log(state);

    useEffect(() => {
        if (state === 'Success') {

            window.location.replace('/');
        }

    }, [state]);



    return (
        <form action={dispatch} className="flex flex-col">
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email"
                name="email"
                placeholder='Email'
            />

            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password"
                name="password"
                placeholder='Password'
            />

            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {state === "Invalid credentials." && (
                    <div className="flex flex-row mb-2">
                        <IoWarningOutline className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500 ml-5">
                            Invalid credentials.
                        </p>
                    </div>
                )}
            </div>

            <LoginButton />

            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link href="/auth/register" className="btn-secondary text-center">
                Register
            </Link>
        </form>
    );
};

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className={clsx({
                "btn-primary": !pending,
                "btn-disabled": pending
            })}
            disabled={pending}
        >
            Login
        </button>
    );
}
