import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';


const EmptyPage = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[800px]">
            <IoCartOutline size={100} className='mx-5 mb-10' />
            <div className='flex flex-col items-center'>
                <h1 className='text-xl font-semibold'>Your cart is empty</h1>
                <Link
                href={'/'}
                className='text-4xl text-red-400 mt-2'
                >
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default EmptyPage