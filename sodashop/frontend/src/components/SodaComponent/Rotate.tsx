import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { TypeProduct } from "../types";
import { useRef } from "react";

type TypeRotate = {
    Products: TypeProduct[],
    product: (Product: TypeProduct) => void,
    color: number,
    setColor: Dispatch<SetStateAction<number>>
}

export const RotateSoda: FC<TypeRotate> = ({Products, product, color, setColor}) => {
    const [deg, setDeg] = useState<number>(-90);

    const rotate = useRef<HTMLDivElement>(null);


    function Rotate(){
        if (rotate.current !== null){
            document.body.style.setProperty('--change', (-deg - 90) + "deg");
            rotate.current.classList.add("animrotate");

            setTimeout(() => {
                if (rotate.current !== null){
                    rotate.current.style.transform = "translate(50%, 53%) rotate(" + (-(deg + 90) % 360) + "deg)";
                    rotate.current.classList.remove("animrotate");
                    
                    setDeg((deg + 90) % 360);
                }
            }, 1000);
        
            product(Products[color]);
        }
    }

    useEffect(Rotate, [color]);

    return (
        <div className="rotate__container">
            <div id="rotate" className="rotate" ref={rotate} >
                <img id="soda1" onClick={() => setColor((color + 1) % 4)} src={Products[0].image}/>
                <img id="soda2" onClick={() => setColor((color + 1) % 4)} src={Products[1].image}/>
                <img id="soda3" onClick={() => setColor((color + 1) % 4)} src={Products[2].image}/>
                <img id="soda4" onClick={() => setColor((color + 1) % 4)} src={Products[3].image}/>
            </div>
        </div>
    )
}