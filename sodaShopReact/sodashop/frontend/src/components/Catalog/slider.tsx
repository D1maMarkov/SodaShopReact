import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { FC } from "react";
import "./slider.scss";
import 'swiper/css/navigation';
import "swiper/swiper-bundle.css";
import { TypeImage } from '../types';


type TypeSlider = {
    slider: TypeImage[]
}


export const Slider: FC<TypeSlider> = ({slider}) => {
    const Slides = document.getElementsByClassName("swiper-slide");

    const SlidesArray:Element[] = [];
    const length: number = 5;

    const navigate = useNavigate();

    function getArray(){
        for (let i = 0; i < Slides.length; i++){
            SlidesArray.push(Slides[i]);
        }
    }

    function getSlides(){
        let currentInd = SlidesArray.indexOf(document.getElementsByClassName("swiper-slide-active")[0]) + Math.floor(length / 2);
        SlidesArray[currentInd].classList.remove("middle-swiper-slide");
        SlidesArray[currentInd].classList.remove("edge-swiper-slide");
        SlidesArray[currentInd + 2].classList.remove("middle-swiper-slide");
        SlidesArray[currentInd - 1].classList.remove("center-swiper-slide");
        SlidesArray[currentInd + 1].classList.remove("center-swiper-slide");
        SlidesArray[currentInd + 1].classList.remove("edge-swiper-slide");

        SlidesArray[currentInd + 0].classList.add("center-swiper-slide");
        SlidesArray[currentInd - 2].classList.add("edge-swiper-slide");
        SlidesArray[currentInd + 2].classList.add("edge-swiper-slide");
        SlidesArray[currentInd - 1].classList.add("middle-swiper-slide");
        SlidesArray[currentInd + 1].classList.add("middle-swiper-slide");
    }

    setTimeout(getArray, 900);
    setTimeout(getSlides, 1000);

    return (
        <Swiper
            spaceBetween={"0px"}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={length}
            navigation
            pagination={{ clickable: true }}
            onSlideChange={() => setTimeout(() => getSlides(), 0.1)}
            onSwiper={() => setTimeout(() => getSlides(), 0.1)}
            speed={500}
            >
            {slider.map((image : TypeImage) =>
                <SwiperSlide className={"catalog_soda"} key={image.id}>
                    <img onClick={() => navigate("/soda/" + image.category + "/" + image.id)} src={image.image} alt={""}/>
                </SwiperSlide>
            )}
        
        </Swiper>
    )
}