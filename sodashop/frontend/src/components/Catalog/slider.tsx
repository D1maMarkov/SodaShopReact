import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from "react";
import "./slider.scss";
import 'swiper/css/navigation';
import "swiper/swiper-bundle.css";
import { TypeProduct } from '../types';


type TypeSlider = {
    slider: TypeProduct[]
}

export const Slider: FC<TypeSlider> = ({slider}) => {
    const navigate = useNavigate();

    let SlidesArray : Element[] = [];

    const length: number = 5;

    function getSlides(){
        SlidesArray = [...document.getElementsByClassName("swiper-slide")];
        let currentInd = SlidesArray.indexOf(document.getElementsByClassName("swiper-slide-active")[0]) + Math.floor(length / 2);
        
        if (SlidesArray.length > 0){
          
                SlidesArray[currentInd - 2].classList.add("edge-swiper-slide");
                SlidesArray[currentInd - 1].classList.remove("center-swiper-slide");
                SlidesArray[currentInd - 1].classList.add("middle-swiper-slide");
                
                SlidesArray[currentInd].classList.remove("middle-swiper-slide");
                SlidesArray[currentInd].classList.add("center-swiper-slide");
                
                SlidesArray[currentInd + 1].classList.remove("center-swiper-slide");
                SlidesArray[currentInd + 1].classList.remove("edge-swiper-slide");
                SlidesArray[currentInd + 1].classList.add("middle-swiper-slide");
                SlidesArray[currentInd + 2].classList.remove("middle-swiper-slide");
                SlidesArray[currentInd + 2].classList.add("edge-swiper-slide");
         
        }
    }

    useEffect(getSlides, [SlidesArray]);

    return (
        <div className={"catalog__wrapper"}>
            <Swiper
                spaceBetween={"0px"}
                modules={[Navigation, Pagination]}
                slidesPerView={length}
                pagination={{ clickable: true }}
                onSlideChange={() => setTimeout(() => getSlides(), 0.1)}
                onSwiper={() => setTimeout(() => getSlides(), 0.1)}
                speed={500}
                navigation
                >
                {slider.map((image : TypeProduct) =>
                    <SwiperSlide className={"catalog__soda"} key={image.id}>
                        <img onClick={() => navigate(`/soda/${image.category}/${image.id}`)} src={image.image}/>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}