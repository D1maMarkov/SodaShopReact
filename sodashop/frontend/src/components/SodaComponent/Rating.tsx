import { FC, useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import Alert from "../Alert";
import { TypeProduct } from "../types";
import "./main.scss";


type TypeProductRating = {
    product: TypeProduct
}

export const ProductRating: FC<TypeProductRating> = ({ product }) => {
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);
    const [currentRate, setCurrentRate] = useState<string>("0");

    const [rating, setRating] = useState<number>(0);
    
    const [left, setLeft] = useState<boolean>(false);


    const handleClose = (type: string) => {
        if (type == "warning"){
            setOpenWarning(false);
        }
        else if (type == "success"){
            setOpenSuccess(false);
        }
        else{
            setOpenError(false);
        }
    };


    const handleRating = (rate: number) => {
        if (left){
            setOpenWarning(true);
        }
        else{
            setRating(rate);
       
            if (rate != 0 && !left){
                sendFeedback(rate);
                setLeft(true);
            }
        }
    }

    function getRates(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                try{
                    if (xhttp.response.left){
                        setLeft(true);
                        setRating(xhttp.response.rate.value);
                    }
                    else{
                        setLeft(false);
                        setRating(0);
                    }

                    setCurrentRate(xhttp.response.rate.value + "(" + xhttp.response.rate.count + ")");
                }
                catch{
                    setCurrentRate("0.0(0)");
                }
            }
        }
    
        xhttp.open("GET", "/get-rates/" + product.id);
        xhttp.send();
    }


    function sendFeedback(rate: number){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpenSuccess(true);
            }
            else if (this.readyState == 4 && this.status != 200){
                setOpenError(true);
            }
        }

        xhttp.open("GET", "/send-feedback/" + product.id + "/" + rate);
        xhttp.send();
    }

    useEffect(getRates, [product, rating]);

    return (
        <>
        {!left ?( 
            <div title="send feedback" className={"rate"} onMouseLeave={() => setRating(0)}>
                <Rating initialValue={rating} onClick={handleRating}/>
                <p>{ currentRate }</p>
            </div>
        ):(
            <div title="send feedback" className={"rate"} onClick={() => setOpenWarning(true)}>
                <Rating style={{ pointerEvents: "none"}} initialValue={rating} />
                <p>{ currentRate }</p>
            </div>
        )}

        <Alert open={openSuccess} severity={"success"} handleClose={() => handleClose("success")} text={"Your feedback has been sent successfully"} />
        <Alert open={openWarning} severity={"warning"} handleClose={() => handleClose("warning")} text={"You have already left a review for this product"} />
        <Alert open={openError} severity={"error"} handleClose={() => handleClose("error")} text={"In order to send feedback, you need to log in to your account"} />
        </>
    )
}