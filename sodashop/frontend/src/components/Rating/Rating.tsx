import { FC, useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import Alert from "../Alert";
import styles from "./rating.module.scss";


type TypeRating = {
    productId: Number
}

export const ProductRating: FC<TypeRating> = ({productId}) => {
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);
    const [openWarning, setOpenWarning] = useState<boolean>(false);
    const [openError, setOpenError] = useState<boolean>(false);
    const [currentRate, setCurrentRate] = useState<string>("0");

    const [rating, setRating] = useState<number>(0);
    
    const [left, setLeft] = useState<boolean>(false);

    const handleClose = () => {
        setOpenWarning(false);
        setOpenSuccess(false);
        setOpenError(false);
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
    
        xhttp.open("GET", "/get-rates/" + productId);
        xhttp.send();
    }


    function sendFeedback(rate: number){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4){
                setOpenSuccess(this.status == 200);
                setOpenError(!(this.status == 200));
            }
        }

        xhttp.open("GET", `/send-feedback/${productId}/${rate}`);
        xhttp.send();
    }

    useEffect(getRates, [rating, productId]);

    return (
        <>
        {!left ?( 
            <div title="send feedback" className={styles.rate} onMouseLeave={() => setRating(0)}>
                <Rating initialValue={rating} onClick={handleRating}/>
                <p>{ currentRate }</p>
            </div>
        ):(
            <div title="send feedback" className={styles.rate} onClick={() => setOpenWarning(true)}>
                <Rating style={{ pointerEvents: "none"}} initialValue={rating} />
                <p>{ currentRate }</p>
            </div>
        )}

        <Alert open={openSuccess} severity={"success"} handleClose={handleClose} text={"Your feedback has been sent successfully"} />
        <Alert open={openWarning} severity={"warning"} handleClose={handleClose} text={"You have already left a review for this product"} />
        <Alert open={openError} severity={"error"} handleClose={handleClose} text={"In order to send feedback, you need to log in to your account"} />
        </>
    )
}