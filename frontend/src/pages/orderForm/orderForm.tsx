import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Blobs } from "../../components/global/blobs/blobs";
import Alert from "../../components/Alert";
import { initialValue } from '../../state/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { ProductsForm } from './productsForm';
import { Topnav } from '../../components/global/topnav/topnav';
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { getUserInfo } from "../../hooks/useCurrentUser";
import usePlacesAutocomplete from "use-places-autocomplete";
import { FormInput } from "../../components/form/formInput/formInput";
import styles from "./orderForm.module.scss";


const libraries: Libraries = ["places"];

type TypeHandle = {
    description: string
}

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
    const [errorAdress, setErrorAdress] = useState<string>("");

    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);


    const [loading, setLoading] = useState<boolean>(false);
    const [openSuccess, setOpenSuccess] = useState<boolean>(false);

    function getForm(){
        setLoading(true);
        fetch("/cart/create-order", {
            method: "post",
            body: `name=${name}&phone=${phone}&delivery=${delivery}&payment=${payment}&adress=${value}&comment=${comment}`,
            headers: {
                'Accept': 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded'
            }})
            .then(response => response.json())
            .then(response => {
                setLoading(false);
                if (response.status === "valid"){
                    setOpenSuccess(true);
                    setTimeout(() => {
                        navigate("/");
                        dispatch(initialValue([]))
                    }, 2100);
                }
                else{
                    const errors = response.errors;

                    setErrorName(errors.name !== undefined ? errors.name[0] : "");
                    setErrorPhone(errors.phone !== undefined ? errors.phone[0] : "");
                    setErrorPayment(errors.payment !== undefined ? errors.payment[0] : "");
                    setErrorAdress(errors.adress !== undefined ? errors.adress[0] : "");
                    setErrorDelivery(errors.delivery !== undefined ? errors.delivery[0] : "");
                }
            })
    }

    useEffect(() => getUserInfo({setUserName: setName, setPhone: setPhone, setAdress: setValue}), []);

    const changeDeliveryMethod = (value: string) => {
      setDelivery(value);
      setDeliveryPrice(value === "Courier" ? 5 : 2);
    }

    const handleCloseSuccess = () => {
        setOpenSuccess(false);
    }

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

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDOd9Bx2sWmTLhVjR07Df89bmk4W2K-x5M",
        libraries
    })

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

    const handleSelect = ({ description } : TypeHandle) => () => {
        setValue(description, false);
        clearSuggestions();
    };

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

                    <FormInput label="adress*" value={value} setValue={setValue} error={errorAdress} />
                    {status === "OK" && <ul className={styles.hint} >{renderSuggestions()}</ul>}

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
