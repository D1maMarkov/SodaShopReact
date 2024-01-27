import { FC } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { TypeProduct } from '../../components/types';
import styles from "./slider.module.scss";

import "swiper/swiper-bundle.css";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


type TypeSlider = {
    slider: TypeProduct[]
}

export const Slider: FC<TypeSlider> = ({slider}) => {
    const navigate = useNavigate();

    return (
        <div className={styles.catalog__wrapper}>
            <Swiper
                modules={[EffectCoverflow, Navigation, Pagination]}
                centeredSlides={true}
                slidesPerView={3}
                initialSlide={2}
                style={{ width: '90vw', marginTop: "3vh", height: "85vh" }}
                effect={"coverflow"}
                coverflowEffect={{          
                    rotate: 0,
                    stretch: 0,
                    depth: 160,
                    modifier: 2,          
                    slideShadows: false,
                }}  
                speed={500}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                navigation={{
                    nextEl: '.' + styles.buttonNext,
                    prevEl: '.' + styles.buttonPrev,
                }}
                >
                {slider.map((image : TypeProduct) =>
                    <SwiperSlide className={styles.catalog__soda} key={image.id}>
                        <img onClick={() => navigate(`/soda/${image.category}/${image.id}`)} src={image.image} alt={image.name}/>
                    </SwiperSlide>
                )}
            </Swiper>

            <div className="slider-controler">
                <div className={styles.buttonNext + " swiper-button-next slider-arrow"}></div>

                <div className={styles.buttonPrev + " swiper-button-prev slider-arrow"}></div>
                
                <div className="swiper-pagination"></div>
            </div>
        </div>
    )
}