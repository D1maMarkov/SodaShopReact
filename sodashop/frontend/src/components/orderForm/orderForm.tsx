import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import usePlacesAutocomplete from "use-places-autocomplete";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/swiper-bundle.css";
import { Blobs } from "../Blobs/Blobs";
import Alert from "../Alert";
import { validationPhone } from "../../hooks/validations";
import { getUserInfo } from "../../hooks/useCurrentUser";
import { RootState } from "../../state/store";
import { initialValue } from '../../state/cart/cartSlice';
import { TypeCartProduct } from "../types";
import styles from "./orderForm.module.scss";
import { Cart } from '../Cart/Cart';
import { Autocomplite, TypeCords } from './autocomplite';


const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

export const SendLocation: FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
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
    const [errorAdress, setErrorAdress] = useState<string>("");
    const [errorPayment, setErrorPayment] = useState<string>("");
    const [errorDelivery, setErrorDelivery] = useState<string>("");

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false); 
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    const [center, setCenter] = useState<TypeCords>(defaultCenter);

    const cart = useSelector((state: RootState) => state.cart.cart);

    const {
        ready,
        value,
        suggestions: {status, data},
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
    });

    function getForm(){
      name.length == 0 ? setErrorName("Write your name") : setErrorName("");
      validationPhone(phone) ? setErrorPhone("") : setErrorPhone("Write correct phone number");
      value.length == 0 ? setErrorAdress("Write correct adress") : setErrorAdress("");
      payment.length == 0 ? setErrorPayment("Chose payment method") : setErrorPayment("");
      delivery.length == 0 ? setErrorDelivery("Chose delivery method") : setErrorDelivery("");

      if (name.length > 0 && phone.length > 0 && errorPhone.length == 0 && delivery.length > 0 && value.length > 0 && payment.length > 0){
        setLoading(true);
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpenSuccess(true);
                setTimeout(() => {navigate("/"); dispatch(initialValue([]))}, 2100);
            }
        }

        let currentComment: string = comment.length > 0 ? comment : "NoComment";

        xhttp.open("GET", `/create-order/${name}/${phone}/${delivery}/${payment}/${center.lat}/${center.lng}/${currentComment}`);
        xhttp.send();
      }
    }

    useEffect(() => {
      !validationPhone(phone) ? setErrorPhone("Write correct phone number") : setErrorPhone("");
    }, [phone]);

    useEffect(() => {
      setTotalPrice(cart.map((product: TypeCartProduct) => 
          product.price * product.quantity 
      ).reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0));
    }, [cart]);

    useEffect(() => getUserInfo({setUserName: setName, setPhone: setPhone, setAdress: setValue}), []);

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
    };

	  return (
        <>
        <Blobs />
       

        <Alert severity={"success"} handleClose={handleCloseSuccess} open={openSuccess} text={"The order has been successfully placed"} />

        <div className={styles.main}>
          <div className={styles.register__blank} style={{ borderRight: "1px solid rgb(150, 150, 150)" }} >
              <p style={{ textAlign: "left", marginLeft: "10%" }}>required fields are marked with asterisks</p>

              <TextField className={styles.login__input} label="recipient's name*" variant="standard" value={name} onChange={event => setName(event.target.value)}/><br />
              <div className={ styles.error__log }>{ errorName }</div>
              <TextField className={styles.login__input} label="phone number (+)*" variant="standard" value={phone} onChange={event => setPhone(event.target.value)}/><br />
              <div className={ styles.error__log }>{ errorPhone }</div>
              
              <Autocomplite center={center} setCenter={setCenter} data={data} init={init} clearSuggestions={clearSuggestions} ready={ready} value={value} errorAdress={errorAdress} setValue={setValue}/>

              <div style={{ display: "flex", justifyContent: "space-between", width: "84%", marginLeft: "8%", marginTop: "40px" }} >
                  <FormControl className={styles.select} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label">Payment</InputLabel>
                      <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={payment}
                          label="Payment method"
                          onChange={event => setPayment(event.target.value)}
                          >
                          <MenuItem value={"By cash"}>By cash</MenuItem>
                          <MenuItem value={"Bank card"}>Bank card</MenuItem>
                      </Select>
                  </FormControl>
               
                  <FormControl className={styles.select} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-label2">Delivery</InputLabel>
                      <Select
                          labelId="demo-simple-select-label2"
                          id="demo-simple-select2"
                          value={delivery}
                          label="delivery method"
                          onChange={event => changeDeliveryMethod(event.target.value)}
                          >
                          <MenuItem value={"Pickup"}>Pickup</MenuItem>
                          <MenuItem value={"Courier"}>Courier</MenuItem>
                      </Select>
                  </FormControl>
              </div>

              <div style={{ marginLeft: "25%", position: "relative" }} className={ styles.error__log }>{ errorPayment }</div>
              <div style={{ marginLeft: "25%", position: "relative" }} className={ styles.error__log }>{ errorDelivery }</div>

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

          <div className={styles.register__blank}>
              <div style={{ marginLeft: "5%", width: "90%" }}>
                <div className={styles.space__beetween}>
                    <p>products</p>
                </div>

                <div className={styles.space__beetween}>
                    <Swiper
                        spaceBetween={"0px"}
                        modules={[Pagination]}
                        slidesPerView={length}
                        pagination={{ clickable: true }}
                        className={styles.all__products}
                        speed={500}
                        >
                        {cart.map((product: TypeCartProduct) =>
                            <SwiperSlide key={product.id} className={styles.swiper__image}>
                                <img src={product.image} alt={""}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </div>

                <div className={styles.space__beetween}>
                    <p>Delivery</p>
                    <p>{deliveryPrice + "$"}</p>
                </div>

                <div className={styles.space__beetween}>
                    <p>Price</p>
                    <p>{totalPrice + "$"}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                    <p>{"total: " + Number(totalPrice + deliveryPrice) + "$"}</p>
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