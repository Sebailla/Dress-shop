"use client";

import { Category, Product, ProductImage as ProductWithImage } from "@/interfaces";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { IoTrashBinOutline } from "react-icons/io5";
import { createUpdateProduct, deleteImageProduct } from "@/actions";
import { useRouter } from "next/navigation";
import { ProductImage } from "@/components";

interface Props {
    product: Partial<Product> & { ProductImage?: ProductWithImage[] };
    categories: Category[]
}

interface FormInput {
    description: string;
    images?: FileList;
    inStock: number;
    price: number;
    sizes: string[];
    slug: string;
    tags: string | undefined[];
    title: string;
    gender: 'men' | 'women' | 'kid' | 'unisex'
    categoryId: string
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

    const router = useRouter()

    const {
        handleSubmit,
        register,
        getValues,
        setValue,
        watch
    } = useForm<FormInput>({
        defaultValues: {
            ...product,
            tags: product.tags?.join(', '),
            sizes: product.sizes ?? [],
            images: undefined
        }
    })

    // Redibuja el form si cambian los sizes
    watch('sizes')

    const onSizeChange = (size: string) => {
        const sizes = new Set(getValues('sizes'))
        sizes.has(size) ? sizes.delete(size) : sizes.add(size)
        setValue('sizes', Array.from(sizes))
    }

    const onSubmit = async (data: FormInput) => {

        const formData = new FormData()

        const { images, ...productToSave } = data

        if (product.id) {
            formData.append('id', product.id)
        }

        formData.append('title', productToSave.title)
        formData.append('description', productToSave.description)
        formData.append('price', productToSave.price.toString())
        formData.append('inStock', productToSave.inStock.toString())
        formData.append('slug', productToSave.slug)
        formData.append('gender', productToSave.gender)
        formData.append('categoryId', productToSave.categoryId)
        formData.append('tags', productToSave.tags.toString())
        formData.append('sizes', productToSave.sizes.toString())

        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i])
            }
        }

        const { ok, product: updatedProduct } = await createUpdateProduct(formData)

        if (!ok) {
            alert('Product could not be updated')
            return
        }

        router.replace(`/admin/product/${updatedProduct?.slug}`)

    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-10"
        >
            {/* Textos */}
            <div className="w-full">
                <div className="flex flex-col mb-2">
                    <span className="font-bold">Title</span>
                    <input type="text" className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('title', { required: true, minLength: 3 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Slug</span>
                    <input type="text" className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('slug', { required: true, minLength: 3 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Description</span>
                    <textarea
                        rows={5}
                        className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('description', { required: true, minLength: 3 })}
                    ></textarea>
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Price</span>
                    <input type="number" className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('price', { required: true, min: 0 })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Tags</span>
                    <input type="text" className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('tags', { required: true })}
                    />
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Gender</span>
                    <select
                        className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('gender', { required: true })}
                    >
                        <option value="">[Selection]</option>
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kid">Kid</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div className="flex flex-col mb-2">
                    <span className="font-bold">Category</span>
                    <select
                        className="p-2 border-gray-100 rounded-md bg-gray-100"
                        {...register('categoryId', { required: true })}
                    >
                        <option value="">[Selection]</option>
                        {
                            categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))
                        }
                    </select>
                </div>

                <button className="btn-primary w-full mt-10">
                    Save
                </button>
            </div>

            {/* Selector de tallas y fotos */}
            <div className="w-full">
                {/* As checkboxes */}
                <div className="flex flex-col">

                    <span className="font-bold">Sizes</span>
                    <div className="flex flex-wrap">

                        {
                            sizes.map(size => (
                                <div
                                    key={size}
                                    onClick={() => onSizeChange(size)}
                                    className={
                                        clsx(
                                            "w-14 p-2 mb-s mr-2 border rounded-md transition-all text-center cursor-pointer",
                                            {
                                                "bg-rose-400 text-white border-rose-400": getValues('sizes').includes(size),

                                            }
                                        )
                                    }

                                >
                                    <span>{size}</span>
                                </div>
                            ))
                        }

                    </div>

                    <div className="flex flex-col mb-2 mt-2">
                        <span className="font-bold">Stock</span>
                        <input type="number" className="p-2 border-gray-100 rounded-md bg-gray-100"
                            {...register('inStock', { required: true, min: 0 })}
                        />
                    </div>


                    <div className="flex flex-col my-3">

                        <span className="font-bold">Image</span>
                        <input
                            type="file"
                            multiple
                            className="p-2"
                            accept="image/png, image/jpeg, image/avif"
                            {...register('images')}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {
                            product.ProductImage?.map(image => (
                                <div key={image.id} className="">
                                    <ProductImage
                                        src={image.url}
                                        alt={product.title ?? ''}
                                        width={300}
                                        height={300}
                                        className="shadow-md rounded-t "
                                    />
                                    <button
                                        type="button"
                                        onClick={() => deleteImageProduct(image.id, image.url)}
                                        className="btn-delete w-full rounded-b-xl flex items-center justify-center">
                                        <IoTrashBinOutline size={25} />
                                    </button>
                                </div>
                            ))

                            /* product.ProductImage?.map(image => (
                                <div key={image.id} className="relative w-full h-64">
                                    <ProductImage
                                        src={image.url}
                                        alt={product.title ?? ''}
                                        width={300}
                                        height={300}
                                        className="shadow-md rounded-md w-full h-full object-cover"
                                    />
                                    <button 
                                    onClick={() => deleteImageProduct(image.id, image.url)}
                                    >
                                        <IoTrashBinOutline className="absolute bottom-0 left-0 m-2 text-red-500 rounded" size={30} />
                                    </button>
                                </div>
                            )) */
                        }
                    </div>

                </div>
            </div>
        </form>
    );
};