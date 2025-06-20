
import { Pagination, Title } from "@/components"
import { UserTable } from "./ui/UserTable"
import { getUsers } from "@/actions"
import { redirect } from "next/navigation"

const AdminUserPage = async () => {

    const { ok, users = [] } = await getUsers()

    if (!ok) {
        redirect('/auth/login')   
    }
    
    return (
        <>
            <Title title={`Users Admin`} />

            <div className="mb-10 h-[100dvh]">
                <UserTable users={users}/>
                <Pagination totalPages={3}/>
            </div>
        </>
    )
}

export default AdminUserPage