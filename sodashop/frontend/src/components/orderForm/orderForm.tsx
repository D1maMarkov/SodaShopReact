import { FC, useCallback, useEffect, useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng } from "use-places-autocomplete";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css/navigation';
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


const libraries: Libraries = ["places"];

const defaultCenter = {
    lat: -3.745,
    lng: -38.523
};

type TypeCords = {
    lat: number,
    lng: number
}

export const SendLocation: FC = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";

    const dispatch = useDispatch();
	  const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");

    const [payment, setPayment] = useState<string>("");
    const [delivery, setDelivery] = useState<string>("");
    const [comment, setComment] = useState<string>("");

    const [center, setCenter] = useState<TypeCords>(defaultCenter);

    const [errorName, setErrorName] = useState<string>("");
    const [errorPhone, setErrorPhone] = useState<string>("");
    const [errorAdress, setErrorAdress] = useState<string>("");
    const [errorPayment, setErrorPayment] = useState<string>("");
    const [errorDelivery, setErrorDelivery] = useState<string>("");

    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);

    const [loading, setLoading] = useState<boolean>(false); 
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    const cart = useSelector((state: RootState) => state.cart.cart);

    const { isLoaded } = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: "AIzaSyAu689F2vjh_sjG2o86WSd07Uk1KTJb8KA",
      libraries
	  })

    const onPlaceSelect = useCallback(
        (cords: TypeCords) => {
            setCenter(cords);
        },
        []
    );

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
      } = usePlacesAutocomplete({
        initOnMount: false,
        debounce: 300,
      });
      
    
    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value);
    };
    
    type TypeHandle = {
      description: string
    }

    const handleSelect = ({ description } : TypeHandle) => () => {

      setValue(description, false);
      clearSuggestions();
      
      // Get latitude and longitude via utility functions
      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        onPlaceSelect({ lat, lng });
      });
    };
    
    const renderSuggestions = () =>
        data.map((suggestion) => {
          const {
            place_id,
            structured_formatting: { main_text, secondary_text },
          } = suggestion;
    
          return (
            <li key={place_id} className={styles.li} onClick={handleSelect(suggestion)}>
                <svg
                  className={styles.svg}
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none">
                  <path
                    d="M2.15855 10.7706C1.25539 10.5015 1.26005 9.37172 1.93487 9.05089L18.9069 0.981837C19.6873 0.610843 20.5521 1.47573 20.1811 2.25606L12.1121 19.2281C11.7912 19.9029 10.6615 19.9076 10.3924 19.0044L9.0223 14.406C8.6989 13.3205 7.84246 12.4641 6.75699 12.1407L2.15855 10.7706Z"
                    stroke="#B7B7B7"
                    stroke-width="1.5"
                  />
				        </svg>
              <span>{main_text}, {secondary_text}</span>
            </li>
          );
    });

    useEffect(() => {
      if (isLoaded){
          init();
      }
    }, [isLoaded, init]);


	  const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        onPlaceSelect(userLocation);
        reverseGeocode(userLocation);
        });
      } else {
        onPlaceSelect(center);
      }
    };


	  function reverseGeocode(center: TypeCords){
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + center.lat + ',' + center.lng + '&key=' + "AIzaSyAu689F2vjh_sjG2o86WSd07Uk1KTJb8KA")
        .then((response) => response.json())
        .then((responseJson) => {
          const adress2 = responseJson;
          setValue(adress2.results[0].formatted_address);    
        })
    }

    setTimeout(() => {
      $(".swiper-button-prev").css("display", "none");
      $(".swiper-button-next").css("display", "none");
    }, 1000);

    function getForm(){
      if (name.length == 0){
        setErrorName("Write your name");
      }
      else{
        setErrorName("");
      }

      if (validationPhone(phone)){
        setErrorPhone("");
      }

      else{
        setErrorPhone("Write correct phone number");
      }

      if (phone.length == 0){
        setErrorPhone("Write correct phone number")
      }

      if (value.length == 0){
        setErrorAdress("Write correct adress");
      }
      else{
        setErrorAdress("");
      }

      if (payment.length == 0){
        setErrorPayment("Chose payment method");
      }
      else{
        setErrorPayment("");
      }

      if (delivery.length == 0){
        setErrorDelivery("Chose delivery method");
      }
      else{
        setErrorDelivery("");
      }

      if (name.length > 0 && phone.length > 0 && errorPhone.length == 0 && delivery.length > 0 && value.length > 0 && payment.length > 0){
        setLoading(true);
        let xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOpenSuccess(true);
                setTimeout(() => {navigate("/"); dispatch(initialValue([]))}, 2100);
            }
        }

        let currentComment: string = "NoComment";
        if (comment.length > 0){
          currentComment = comment;
        }

        xhttp.open("GET", "/create-order/" + name + "/" + phone + "/" + delivery + "/" + payment + "/" + center.lat + "/" + center.lng + "/" + currentComment);
        xhttp.send();
      }
    }


    function checkPhoneNumber(){
      let re = /[+][7]\d{10}/g;
      let myArray = re.exec(phone);

      if (myArray && phone.length == 12 || phone.length == 0){
        setErrorPhone("");
      }
      else{
        setErrorPhone("Write correct phone number");
      }
    }

    useEffect(checkPhoneNumber, [phone]);
    useEffect(getUserLocation, []);

    useEffect(() => {
      setTotalPrice(cart.map((product: TypeCartProduct) => 
          product.product.price * product.quantity 
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
        <Cart />

        <Alert severity={"success"} handleClose={handleCloseSuccess} open={openSuccess} text={"The order has been successfully placed"} />

        <div className={styles.main}>
          <div className={styles.register__blank} style={{ borderRight: "1px solid rgb(150, 150, 150)" }} >
              <p style={{ textAlign: "left", marginLeft: "10%" }}>required fields are marked with asterisks</p>

              <TextField className={styles.login__input} label="recipient's name*" variant="standard" value={name} onChange={event => setName(event.target.value)}/><br />
              <div className={ styles.error__log }>{ errorName }</div>
              <TextField className={styles.login__input} label="phone number (+)*" variant="standard" value={phone} onChange={event => setPhone(event.target.value)}/><br />
              <div className={ styles.error__log }>{ errorPhone }</div>
              
              <TextField 
                  className={styles.login__input} 
                  style={{ marginBottom: "0px!important" }}
                  label="adress*" 
                  variant="standard" 
                  id="adress"
                  value={value} 
                  disabled={!ready}
                  onChange={handleInput}
              />
              <div className={ styles.error__log }>{ errorAdress }</div>

              {status === "OK" && <ul className={styles.hint} >{renderSuggestions()}</ul>}  
              

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
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={length}
                        navigation
                        pagination={{ clickable: true }}
                        className={styles.all__products}
                        speed={500}
                        >
                        {cart.map((product: TypeCartProduct) =>
                            <SwiperSlide key={product.id} className={styles.swiper__image}>
                                <img src={product.product.image} alt={""}/>
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