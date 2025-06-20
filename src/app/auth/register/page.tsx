import { titleFont } from "@/config/fonts";
import { RegisterForm } from "./ui/RegisterForm";


export default function Register() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={`${titleFont.className} text-4xl mb-10 text-center`}>
        Register
      </h1>

      <RegisterForm />

    </div>
  )
}
