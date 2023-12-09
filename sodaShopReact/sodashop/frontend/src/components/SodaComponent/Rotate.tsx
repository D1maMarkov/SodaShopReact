import { FC, useEffect, useState, Dispatch, SetStateAction } from "react";
import { TypeProduct } from "../types";


type TypeRotate = {
    Products: TypeProduct[],
    product: (Product: TypeProduct) => void,
    color: number,
    setColor: Dispatch<SetStateAction<number>>
}

export const RotateSoda: FC<TypeRotate> = ({Products, product, color, setColor}) => {
    const [deg, setDeg] = useState<number>(-90);

    function Rotate(element: HTMLElement | null){
        if (element){
            let root = document.documentElement;

            root.style.setProperty('--change', (-deg - 90) + "deg");
            $(element).addClass("animrotate");
            const imgs = $("img");

            setTimeout(function(){
                $(element).css("transform", "translate(50%, 53%) rotate(" + (-(deg + 90) % 360) + "deg)");
                $(element).removeClass("animrotate");
                for (let i = 0; i < imgs.length; i++){
                    $(imgs[i]).css("pointer-events", "auto");
                }
                setDeg((deg + 90) % 360);
            }, 1000);
        
            product(Products[Number(color)]);
        }
    }

    useEffect(() => {
        Rotate(document.getElementById("rotate"));
    }, [color]);

    return (
        Products != undefined ? (
            <div className="rotate__container">
                <div id="rotate" className="rotate">
                    <img id="soda1" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[0].image}/>
                    <img id="soda2" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[1].image}/>
                    <img id="soda3" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[2].image}/>
                    <img id="soda4" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[3].image}/>
                </div>
            </div>
        ) : (
            <></>
        )
    )
}