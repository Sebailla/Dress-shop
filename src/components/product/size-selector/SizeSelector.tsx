import type { ValidSize } from "@/interfaces"
import clsx from 'clsx';

interface Props {
    selectedSize: ValidSize
    availableSizes: ValidSize[]
}

export const SizeSelector = ({ selectedSize, availableSizes }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles</h3>
            <div className="flex">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            className={clsx(
                                "mx-3 hover:font-bold text-xl hover:text-rose-500",
                                {
                                    'text-rose-500 font-bold' : size === selectedSize
                                }
                            )}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

