import type { Size } from "@/interfaces"
import clsx from 'clsx';

interface Props {
    selectedSize?: Size
    availableSizes: Size[]
    post: boolean
    onSizeChange: (size: Size) => void
}

export const SizeSelector = ({ selectedSize, availableSizes, onSizeChange, post }: Props) => {
    return (
        <div className="my-5">
            <h3 className="font-bold mb-2">Tallas disponibles</h3>
            {
                post && !selectedSize &&
                (
                    <span className="text-red-500 fade-in">
                        * Please select a size
                    </span>
                )
            }
            <div className="flex mt-2">
                {
                    availableSizes.map((size) => (
                        <button
                            key={size}
                            className={clsx(
                                "mx-3 hover:font-bold text-xl hover:text-rose-500",
                                {
                                    'text-rose-500 font-bold': size === selectedSize
                                }
                            )}
                            onClick={() => onSizeChange(size)}
                        >
                            {size}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

