import { FC, useEffect, useState, Dispatch } from "react";
import { TypeProduct } from "../../components/types";
import styles from "./soda.module.scss";


type TypeRotate = {
    Products: TypeProduct[],
    color: number,
    setColor: Dispatch<number>,
    gradient1: string,
    setGradient1: Dispatch<string>,
    setGradient2: Dispatch<string>,
    anim: boolean,
    setAnim: Dispatch<boolean>
}

export const RotateSoda: FC<TypeRotate> = ({Products, color, setColor, gradient1, setGradient1, setGradient2, anim, setAnim}) => {
    const [deg, setDeg] = useState<number>(0);
    const [initialised, setInitialised] = useState(false);

    function Rotate(){
        if (initialised){
            setDeg((deg + 90));
        }
        else{
            setInitialised(true);
        }

        setGradient1(Products[color].gradient)
        setGradient2(gradient1);
        
        setAnim(true);
        setTimeout(function(){
            setAnim(false);
        }, 1000);
    }

    useEffect(Rotate, [color]);

    return (
        <div className={styles.rotate__container}>
            <div className={styles.rotate}
                style={{transform: `translate(50%, 53%) rotate(${-deg}deg)`}}>
                {Products.map((product: TypeProduct, index: number) => 
                    <img 
                        style={{pointerEvents: anim ? "none" : "auto" }} 
                        id={styles["soda" + (index + 1)]} 
                        onClick={() => setColor((color + 1) % 4)} 
                        src={product.image}
                        alt={product.name}
                    />
                )}
            </div>
        </div>
    )
}