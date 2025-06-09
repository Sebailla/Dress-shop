import { auth } from "@/auth.config"
import { Title } from "@/components"
import { redirect } from "next/navigation"


const ProfilePage = async () => {

    const session = await auth()
    if(!session?.user){
        //redirect('/auth/login?returnTo=/profile')
        redirect('/')
    }
    return (
        <div className="h-[100dvh]">
            <Title title="Profile" className="my-20"/>

            <pre>
                {
                    JSON.stringify(session.user, null, 2)
                }
            </pre>
            <h3>{session.user.role}</h3>
        </div>
    )
}

export default ProfilePage;