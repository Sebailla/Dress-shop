'use client'
import { autoLogin, registerUser } from "@/actions"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"

type FormImputs = {
    name: string
    email: string
    password: string
    example: string
    exampleRequired: string
}

export const RegisterForm = () => {

    const [errorMsg, setErrorMsg] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm<FormImputs>()

    const onSubmit: SubmitHandler<FormImputs> = async (data) => {
        
        setErrorMsg('')
        const { name, email, password } = data
        const resp = await registerUser(name, email, password)

        if(resp.ok === false){
            setErrorMsg(resp.message)
            return
        }

        await autoLogin(email.toLowerCase(), password)
        window.location.replace('/')
    }


    return (
        <form
            className="flex flex-col"
            onSubmit={handleSubmit(onSubmit)}
        >

            {
                errors.name?.type === 'required' && <span className="text-red-500 text-[10px]"> * This field is required</span>
            }
            {
                errors.name?.type === 'minLength' && <span className="text-red-500 text-[10px]">* Invalid Name</span>
            }

            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.name
                        }
                    )
                }
                type="text"
                placeholder="Name"
                {...register('name', { required: true, minLength: 3 })}
            />

            {
                errors.email?.type === 'required' && <span className="text-red-500 text-[10px]"> * This field is required</span>
            }
            {
                errors.email?.type === 'pattern' && <span className="text-red-500 text-[10px]">* Invalid email</span>
            }
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.email
                        }
                    )
                }
                type="email"
                placeholder="Email"
                {...register('email', { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
            />

            {
                errors.password?.type === 'required' && <span className="text-red-500 text-[10px]"> * This field is required</span>
            }
            {
                errors.password?.type === 'minLength' && <span className="text-red-500 text-[10px]">* Invalid password</span>
            }
            <input
                className={
                    clsx(
                        "px-5 py-2 border bg-gray-200 rounded mb-5",
                        {
                            'border-red-500': errors.password
                        }
                    )
                }
                type="password"
                placeholder="Password"
                {...register('password', { required: true, minLength: 6 })}
            />

            <span className="text-red-500 text-[12px] text-center p-2">{errorMsg}</span>

            <button
                className="btn-primary">
                SingUp
            </button>

            {/* divisor line */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Login
            </Link>

        </form>
    )
}
