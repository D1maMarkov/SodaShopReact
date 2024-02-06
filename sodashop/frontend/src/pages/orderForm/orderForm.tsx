import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Blobs } from "../../components/global/blobs/blobs";
import Alert from "../../components/Alert";
import { validationPhone } from "../../hooks/validations";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { RootState } from "../../state/store";
import { initialValue } from '../../state/cart/cartSlice';
import { TypeCartProduct } from "../../components/types";
import { Autocomplite, TypeCords } from './autocomplite';
import { FormInput } from '../../components/form/formInput/formInput';
import { CartDemo } from '../../components/cartDemo/cartDemo';
import { Topnav } from '../../components/global/topnav/topnav';
import styles from "./orderForm.module.scss";


const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const OrderForm: FC = () => {
    document.body.style.overflowY = "auto";

    const dispatch = useDispatch();
	const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [payment, setPayment] = useState<string>("");
    const [delivery, setDelivery] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const [errorName, setErrorName] = useState<string>("");
    const [errorPhone, setErrorPhone] = useState<string>("");
   
    const [errorPayment, setErrorPayment] = useState<string>("");
    const [errorDelivery, setErrorDelivery] = useState<string>("");

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

    const [adressValid, setAdressValid] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false); 
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    const [center, setCenter] = useState<TypeCords>(defaultCenter);

    const cart = useSelector((state: RootState) => state.cart.cart);

    function getForm(){
      setErrorName(name.length == 0 ? "Write your name" : "");
      setErrorPhone(validationPhone(phone) ? "" : "Write correct phone number");
      setErrorPayment(payment.length == 0 ? "Chose payment method" : "");
      setErrorDelivery(delivery.length == 0 ? "Chose delivery method" : "");

      if (name.length > 0 && phone.length > 0 && errorPhone.length == 0 && delivery.length > 0 && payment.length > 0 && adressValid){
        setLoading(true);
        const currentComment: string = comment.length > 0 ? comment : "NoComment"

        fetch(`/create-order/${name}/${phone}/${delivery}/${payment}/${center.lat}/${center.lng}/${currentComment}`)
            .then(() => {
                setOpenSuccess(true);
                setTimeout(() => {navigate("/"); dispatch(initialValue([]))}, 2100);
            })
        }
    }

    useEffect(() => {
      setErrorPhone(validationPhone(phone) ? "" : "Write correct phone number");
    }, [phone]);

    useEffect(() => {
      setTotalPrice(cart.map((product: TypeCartProduct) => 
          product.price * product.quantity 
      ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0));
    }, [cart]);

    useEffect(() => getUserInfo({setUserName: setName, setPhone: setPhone}), []);

    const changeDeliveryMethod = (value: string) =>{
      setDelivery(value);
      if (value == "courier"){
        setDeliveryPrice(5);
      }
      else{
        setDeliveryPrice(2);
      }
    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

	return (
        <>
            <Topnav />
            <Blobs overflow=""/>
        
            <Alert severity={"success"} handleClose={handleCloseSuccess} open={openSuccess} text={"The order has been successfully placed"} />

            <div className={styles.main}>
                <div className={styles.form} style={{ borderRight: "1px solid rgb(150, 150, 150)" }} >
                    <p style={{ textAlign: "left", marginLeft: "10%" }}>required fields are marked with asterisks</p>

                    <FormInput label="recipient's name*" value={name} setValue={setName} error={errorName} />
                    <FormInput label="phone number (+)*" value={phone} setValue={setPhone} error={errorPhone} />
                    
                    <Autocomplite center={center} setCenter={setCenter} setAdressValid={setAdressValid}/>

                    <div className={styles.select__wrapper}>
                        <FormControl className={styles.select} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-payment">Payment</InputLabel>
                            <Select
                                labelId="select-payment"
                                value={payment}
                                label="Payment method"
                                onChange={event => setPayment(event.target.value)}
                                >
                                <MenuItem value={"By cash"}>By cash</MenuItem>
                                <MenuItem value={"Bank card"}>Bank card</MenuItem>
                            </Select>
                        </FormControl>
                    
                        <FormControl className={styles.select} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="select-delivery">Delivery</InputLabel>
                            <Select
                                labelId="select-delivery"
                                value={delivery}
                                label="delivery method"
                                onChange={event => changeDeliveryMethod(event.target.value)}
                                >
                                <MenuItem value={"Pickup"}>Pickup</MenuItem>
                                <MenuItem value={"Courier"}>Courier</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div className={ styles.error__log }>{ errorPayment }</div>
                    <div className={ styles.error__log }>{ errorDelivery }</div>

                    <InputLabel id="outlined-multiline-static" className={styles.text__area__label}>Comment</InputLabel>
                    <TextField
                        id="outlined-multiline-static"
                        value={comment} 
                        onChange={event => setComment(event.target.value)}
                        label="Multiline"
                        multiline
                        className={styles.text__area}
                        rows={3}
                    />
                </div>

                <div className={styles.form}>
                    <div style={{ marginLeft: "5%", width: "90%" }}>
                        <div className={styles.space__beetween}>
                            <p>products</p>
                        </div>

                        <CartDemo cart={cart}></CartDemo>

                        <div className={styles.space__beetween}>
                            <p>Delivery</p>
                            <p>{deliveryPrice}$</p>
                        </div>

                        <div className={styles.space__beetween}>
                            <p>Price</p>
                            <p>{totalPrice}$</p>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <p>total:  {totalPrice + deliveryPrice} $</p>
                        </div>

                        {loading || cart.length == 0 ? (
                            <button style={{cursor: "not-allowed"}} disabled className={styles.order__form__butt}>Buy</button>
                        ):(
                            <button onClick={getForm} className={styles.order__form__butt}>Buy</button>
                        )}
                    </div>
                </div>
            </div>
        </>
	);
};

export default OrderForm;