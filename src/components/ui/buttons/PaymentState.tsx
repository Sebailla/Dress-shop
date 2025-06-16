import clsx from "clsx"
import { IoCardOutline } from "react-icons/io5"


interface Props{
    isPaid: boolean
}

export const PaymentState = ({isPaid}: Props) => {

    return (
        <div className={
            clsx(
                "flex justify-center items-center rounded-md py-2.5 px-3.5 text-sm font-bold text-white mt-15 mb-5",
                {
                    "bg-red-500": !isPaid,
                    "bg-green-400": isPaid,
                }
            )
        }>
            <IoCardOutline size={30} />
            <span className="mx-2">
                {isPaid ? 'Paid' : 'Pending payment'}
            </span>
        </div>
    )
}
