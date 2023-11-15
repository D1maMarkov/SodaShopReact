import React, { useEffect, useState } from "react";
import { Rating } from 'react-simple-star-rating';
import Alert from "../Alert";


export const ProductRating = ({ product }) => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [currentRate, setCurrentRate] = useState(0);

    let rating = 0;


    const handleClose = (type) => {
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


    const handleRating = (rate) => {
        rating = rate;
    }


    function get_rates(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                try{
                    setCurrentRate(xhttp.response.value + "(" + xhttp.response.count + ")");
                }
                catch{
                    setCurrentRate("0.0(0)");
                }
            }
        }
    
        xhttp.open("GET", "/get_rates/" + product.id);
        xhttp.send();
    }


    function send_feedback(){
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpenSuccess(true);
            }
            else if (this.readyState == 4 && this.status == 202){
                setOpenWarning(true);
            }
        }

        xhttp.open("GET", "/send_feedback/" + product.id + "/" + rating);
        xhttp.send();
    }

    useEffect(get_rates, [product]);

    return (
        <>
        <div onClick={send_feedback} title="send feedback" class="rate">
            <Rating
                onClick={handleRating}
            />
            <p id="currentRate">{ currentRate }</p>
        </div>


        <Alert open={openSuccess} severity="success" handleClose={() => handleClose("success")} text={"Your feedback has been sent successfully"} />
        <Alert open={openWarning} severity="warning" handleClose={() => handleClose("warning")} text={"You have already left a review for this product"} />
        <Alert open={openError} severity="error" handleClose={() => handleClose("error")} text={"In order to send feedback, you need to log in to your account"} />

        </>
    )
}