import ReactDOM from 'react-dom';
import { Catalog } from "./components/Catalog/catalog";
import { Home } from "./components/Home/Home";
import { Soda } from "./components/SodaComponent/Soda";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/User/login';
import { Register } from './components/User/register';
import { Confirm } from "./components/User/confirm";
import { Profile } from "./components/User/profile";
import { PrivateRoute } from "./utils/privateroute";
import { Page404 } from "./components/404error/notFound";
import { SendLocation } from "./components/OrderForm/orderForm";
import { ResetPassword } from "./components/User/resetPassword";
import { Provider } from 'react-redux';
import { store } from "./state/store";


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/" element={<Home />} />
                <Route path="/order-form" element={<SendLocation />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/soda/:category/:color" element={<Soda />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/confirm" element={<Confirm />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />}/>
                </Route>
                <Route path="/reset-password/:token" element={<ResetPassword />}/>
            </Routes>
        </BrowserRouter>
    </Provider>

), document.getElementById("main"));