import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Blobs } from "../../components/global/blobs/blobs";
import Alert from "../../components/Alert";
import { validationPhone } from "../../hooks/validations";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { initialValue } from '../../state/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { Autocomplite, TypeCords } from './autocomplite';
import { FormInput } from '../../components/form/formInput/formInput';
import { ProductsForm } from './productsForm';
import { Topnav } from '../../components/global/topnav/topnav';
import styles from "./orderForm.module.scss";


const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

const OrderForm: FC = () => {
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

    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

    const [adressValid, setAdressValid] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false); 
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    const [center, setCenter] = useState<TypeCords>(defaultCenter);

    function getForm(){
      setErrorName(name.length == 0 ? "Write your name" : "");
      setErrorPhone(validationPhone(phone) ? "" : "Write correct phone number");
      setErrorPayment(payment.length == 0 ? "Chose payment method" : "");
      setErrorDelivery(delivery.length == 0 ? "Chose delivery method" : "");

      if (name.length > 0 && phone.length > 0 && errorPhone.length == 0 && delivery.length > 0 && payment.length > 0 && adressValid){
        setLoading(true);
        const currentComment: string = comment.length > 0 ? comment : "NoComment"
        fetch(`/cart/create-order/${name}/${phone}/${delivery}/${payment}/${center.lat}/${center.lng}/${currentComment}`)
            .then(() => {
                setOpenSuccess(true);
                setTimeout(() => {
                    navigate("/"); 
                    dispatch(initialValue([]))
                }, 2100);
            })
        }
    }

    useEffect(() => {
      setErrorPhone(validationPhone(phone) ? "" : "Write correct phone number");
    }, [phone]);

    useEffect(() => getUserInfo({setUserName: setName, setPhone: setPhone}), []);

    const changeDeliveryMethod = (value: string) =>{
      setDelivery(value);
      if (value === "Courier"){
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
        
            <Alert 
                severity={"success"} 
                handleClose={handleCloseSuccess} 
                open={openSuccess} 
                text={"The order has been successfully placed"} 
            />

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

                <ProductsForm 
                    loading={loading} 
                    deliveryPrice={deliveryPrice} 
                    getForm={getForm}
                />
            </div>
        </>
	);
};

export default OrderForm;