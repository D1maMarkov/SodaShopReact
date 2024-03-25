import { FC } from "react";
import { TypeCartProduct } from "../types";
import styles from "./cartDemo.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';


type TypeCartDemo = {
    cart: TypeCartProduct[]
}

export const CartDemo:FC<TypeCartDemo> = ({cart}) => {
    return (
        <Swiper
            spaceBetween={"0px"}
            modules={[Pagination]}
            slidesPerView={length}
            pagination={{ clickable: true }}
            className={styles.all__products}
            speed={500}
            >
            {cart.map((product: TypeCartProduct) =>
                <SwiperSlide key={product.id} className={styles.swiper__image}>
                    <img src={product.image} alt={product.name}/>
                </SwiperSlide>
            )}
        </Swiper>
    )
}
