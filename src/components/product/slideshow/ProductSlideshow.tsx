'use client'

import { useState } from 'react';
import { Swiper as SwiperObjet } from 'swiper'
import { ProductImage } from '../images/ProductImage';

//! Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
//! Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
//! import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';


interface Props {
    images: string[]
    title: string
    className?: string
}

export const ProductSlideshow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObjet>();

    return (
        <div className={className}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#666',
                    '--swiper-pagination-color': '#666',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <ProductImage
                                src={image}
                                width={1024}
                                height={800}
                                alt={title}
                                className='rounded-lg object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <ProductImage
                                src={image}
                                width={200}
                                height={200}
                                alt={title}
                                className='rounded-lg object-fill'
                            />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}
