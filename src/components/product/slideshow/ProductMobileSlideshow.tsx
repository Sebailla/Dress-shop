'use client'

import Image from 'next/image';


//! Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import './slideshow.css';
//! import required modules
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';


interface Props {
    images: string[]
    title: string
    className?: string
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {

    return (
        <div className={className}>
            <Swiper
                style={{
                    width: '100vw',
                    height: '500px'
                }}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Autoplay, Pagination]}
                className="mySwiper2"
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={`/products/${image}`}
                                width={600}
                                height={500}
                                alt={title}
                                className='object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
