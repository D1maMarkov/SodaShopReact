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

    const [loaded, setLoaded] = useState<boolean>(false);

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
        
            if (loaded){    
                product(Products[Number(color)]);
                for (let i = 0; i < imgs.length; i++){
                    $(imgs[i]).css("pointer-events", "none");
                }
            }
            else{
                setLoaded(true);
            }
        }
    }

    useEffect(() => {
        Rotate(document.getElementById("f"));
    }, [color]);

    return (
        Products != undefined ? (
            <div id="f" className="rotatecantainer">
                <img id="black" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[0].image}/>
                <img id="pink" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[1].image}/>
                <img id="red" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[2].image}/>
                <img id="white" onClick={() => setColor((color + 1) % 4)} className="chosesoda" src={Products[3].image}/>
            </div>
        ) : (
            <></>
        )
    )
}