import React, { useEffect, useState} from "react";


export const RotateSoda = ({Products, product, color, setColor}) => {
    const [deg, setDeg] = useState(-90);

    const [loaded, setLoaded] = useState(false);

    function Rotate(element){
        var root = document.documentElement;

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

    useEffect(() => {
        Rotate(document.getElementById("f"));
    }, [color]);

    console.log(color);

    return (
        Products != undefined ? (
            <div id="f" class="rotatecantainer">
                <img id="black" onClick={() => setColor((color + 1) % 4)} class="chosesoda" src={Products[0].image}/>
                <img id="pink" onClick={() => setColor((color + 1) % 4)} class="chosesoda" src={Products[1].image}/>
                <img id="red" onClick={() => setColor((color + 1) % 4)} class="chosesoda" src={Products[2].image}/>
                <img id="white" onClick={() => setColor((color + 1) % 4)} class="chosesoda" src={Products[3].image}/>
            </div>
        ) : (
            <></>
        )
    )
}