'use client'

import { roleChange } from "@/actions"
import { User } from "@/interfaces"
import clsx from "clsx"

interface Props {
    users: User[]
}

export const UserTable = ({ users }: Props) => {

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200 border-b">
                <tr>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Name
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Role
                    </th>
                    <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Image
                    </th>
                </tr>
            </thead>
            <tbody>

                {
                    users.map((user) => (
                        <tr
                            key={user.id}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {user.name}

                            </td>
                            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                {user.email}
                            </td>
                            <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <select
                                    defaultValue={user.role}
                                    onChange={e => {
                                        roleChange(user.id, e.target.value)
                                    }}
                                    className={
                                        clsx({
                                            "text-blue-600 font-bold": user.role === 'admin',
                                            "text-gray-800": user.role !== 'admin',
                                        }, "p-2 w-full")
                                    }>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>

                            </td>

                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}
