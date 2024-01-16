import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { TypeProduct } from "../../components/types";
import { useRef } from "react";


type TypeRotate = {
    Products: TypeProduct[],
    color: number,
    setColor: Dispatch<SetStateAction<number>>
}

export const RotateSoda: FC<TypeRotate> = ({Products, color, setColor}) => {
    const [deg, setDeg] = useState<number>(-90);

    const rotate = useRef<HTMLDivElement>(null);

    function product(Product: TypeProduct){
        const currentBackColor = window.getComputedStyle( document.body, null).getPropertyValue('background');
        const grad2 = currentBackColor.slice(currentBackColor.indexOf("line"), currentBackColor.indexOf("))") + 2);
       
        document.querySelectorAll(".rotate *").forEach(element => {
            (element as HTMLElement).style.pointerEvents = "none";
        });
        document.body.style.background = Product.gradient;
        const bodyafter = document.querySelector(".bodyafter") as HTMLElement
        bodyafter.style.background = grad2;
        bodyafter.classList.add("animcontainer");
        setTimeout(function(){
            bodyafter.classList.remove("animcontainer");
            document.querySelectorAll(".rotate *").forEach(element => {
                (element as HTMLElement).style.pointerEvents = "auto";
            });
        }, 1000);
    }

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
            <div className="rotate" ref={rotate} >
                <img id="soda1" onClick={() => setColor((color + 1) % 4)} src={Products[0].image}/>
                <img id="soda2" onClick={() => setColor((color + 1) % 4)} src={Products[1].image}/>
                <img id="soda3" onClick={() => setColor((color + 1) % 4)} src={Products[2].image}/>
                <img id="soda4" onClick={() => setColor((color + 1) % 4)} src={Products[3].image}/>
            </div>
        </div>
    )
}