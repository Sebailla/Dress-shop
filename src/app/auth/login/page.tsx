import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";


export default function LoginHome() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-10 text-center`}>
        Login
      </h1>
      
      <LoginForm/>
      
    </div>
  )
}
