import { FC, useState, useEffect } from "react";
import { Blobs } from "../Blobs/Blobs";
import { useNavigate } from "react-router-dom";
import { Topnav } from "../Topnav/Topnav";
import { Cart } from "../Cart/Cart";
import { TypeCartProduct, TypeProduct } from "../types";
import { Footer } from "../Footer/footer";
import { ValidationEmail, ValidationPhone } from "../../hooks/validations";
import { get_user_info } from "../../hooks/useCurrentUser";
import Alert from "../Alert";
import BlobStyles from "../Blobs/blobs.module.scss";
import styles from "./login.module.scss";


type TypeOrderProduct = {
    id: number,
    order: number,
    quantity: number,
    product: TypeProduct
}

type TypeOrder = {
    current_date: string,
    delivery: string,
    price: number,
    id: number,
    lat: string,
    lng: string,
    orderlist: TypeOrderProduct[],
    length: number,
    user: number,
    comment: string,
    payment: string
}

export const Profile: FC<{}> = () => {
    document.body.style.background = "linear-gradient(45deg, #d13381, #ffe88c) no-repeat";
    document.body.style.height = "100%";
    document.body.style.overflow = "auto";

    const navigate = useNavigate();

    const [cart, setCart] = useState<TypeCartProduct[]>([]);
    const [len_cart, setLenCart] = useState<number>(0);
    const [orders, setOrders] = useState<TypeOrder[]>([]);

    const [username, setUsername] = useState<string>("username");
    const [email, setEmail] = useState<string>("email");
    const [phone, setPhone] = useState<string>("");
    const [adress, setAdress] = useState<string>("");

    const [usernameError, setUsernameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [phoneError, setPhoneError] = useState<string>("");
    const [adressError, setAdressError] = useState<string>("");

    const [changed, setChanged] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);


    function getOrders(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                setOrders(xhttp.response);
             
                if (xhttp.response.length > 0){
                    document.body.style.overflowY = "auto";
                }
            }
        }
    
        xhttp.open("GET", "/getOrders");
        xhttp.send();
    }

    function logout(){
        let xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        xhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){
                navigate("/");
            }
        }
    
        xhttp.open("GET", "/user/logout");
        xhttp.send();
    }

    function confirmAndSave(){
        let valid: boolean = true;

        let input = document.getElementById("username") as HTMLAreaElement | null;
        if (username.length == 0){
            valid = false;
            setUsernameError("write non empty username");

            if (input != null){
                input.classList.add(styles.errorInput);
            }
        }
        else{
            setUsernameError("");
            if (input != null){
                input.classList.remove(styles.errorInput);
            }
        }

        input = document.getElementById("email") as HTMLAreaElement | null;
        if (!ValidationEmail(email)){
            valid = false;
            setEmailError("write correct email");
          
            if (input != null){
                input.classList.add(styles.errorInput);
            }
        }
        else{
            setEmailError("");
            if (input != null){
                input.classList.remove(styles.errorInput);
            }
        }

        input = document.getElementById("phone") as HTMLAreaElement | null;
        if (!ValidationPhone(phone)){
            valid = false;
            setPhoneError("write correct phone number");

            if (input != null){
                input.classList.add(styles.errorInput);
            }
        }
        else{
            setPhoneError("");
            if (input != null){
                input.classList.remove(styles.errorInput);
            }
        }

        if (valid){
            setChanged(false);
            setLoading(true);

            let xhttp = new XMLHttpRequest();
      
            xhttp.onreadystatechange = function(){
                if (this.readyState == 4 && this.status == 200){
                    setLoading(false);
                    setOpen(true);
                }
            }
        
            let params = `username=${username}&email=${email}&adress=${adress}&phone=${phone}`;
   
            xhttp.open("POST", "/user/changeFields", true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(params);
        }
    }

    useEffect(() => {
        get_user_info({setUserName: setUsername, setEmail: setEmail, setPhone: setPhone, setAdress: setAdress});
        getOrders();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            $("#" + BlobStyles.blob1).css("position", "absolute");
            $("#" + BlobStyles.blob2).css("position", "absolute");
        }, 1000)
    })
   
    useEffect(() => {
        const fields = document.getElementsByClassName(styles.fields)[0] as HTMLElement | null;
        if (fields){
            if (loading){
                fields.classList.add(styles.loading);
            }
            else{
                fields.classList.remove(styles.loading);
            }
        }
    }, [loading]);

    const [open, setOpen] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
        <Topnav len_cart={len_cart} type={"mainPage"} color={"white"} />
        <Cart cart={cart} setCart={setCart} setLenCart={setLenCart} />
        <Blobs />

        <Alert severity={"success"} handleClose={handleClose} open={open} text={"The changes are saved!"} />

        <div className={styles.profile} >
            <div className={styles.fields}>
                <p>Username</p>
                <input id="username" value={ username } onChange={event => {setUsername(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ usernameError }</div>

                <p>Email</p>
                <input id="email" value={ email } onChange={event => {setEmail(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ emailError }</div>

                <p>Phone number</p>
                <input id="phone" value={ phone } onChange={event => {setPhone(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ phoneError }</div>

                <p>Adress</p>
                <input id="adress" value={ adress } onChange={event => {setAdress(event.target.value); setChanged(true)}} /><br />
                <div className={styles.error} >{ adressError }</div>

                {changed ? (
                    <button  style={{ backgroundColor: "#f50057", width: "100%", marginLeft: "0px" }} onClick={confirmAndSave} >confirm and save changes</button>
                ):( <></> )
                }
            </div>
            
            <p style={{ color: "rgb(250, 210, 210)" }}>Orders</p>
            {orders.length > 0 ? (
                orders.map((order: TypeOrder, ind: number) =>
                    <div className={styles.order_products}>
                        <div className={styles.order_date}>                     
                            <p>{ order.current_date }</p>                      
                            <p>price: { order.price } $</p>
                        </div>
                        <div className={styles.order_list} >
                           {order.orderlist.map((product: TypeOrderProduct) => 
                                <div className={styles.order_product}>
                                    <img src={ product.product.image } />
                                    <div className={styles.order_product_description}>
                                        <p>{ product.product.name }</p>
                                        <p>{ product.product.description }</p>
                                        <p>quantity: { product.quantity }</p>
                                    </div>
                                </div>
                           )}
                        </div>
                    </div>
                )
            ):(
                <p style={{ position: "relative", left: "30px", color: "rgb(250, 210, 210)" }}>You have no any orders</p>
            )}
            <div style={{ marginTop: "50px", paddingBottom: "100px" }}>
                <a style={{ textDecoration: "none", cursor: "pointer", marginTop: "50px", color: "rgb(250, 210, 210)" }} onClick={logout}>Log out</a>
            </div>
        </div>

        <Footer />
        </>
    )
}