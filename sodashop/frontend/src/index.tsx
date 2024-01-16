import ReactDOM from 'react-dom';
import { Catalog } from "./pages/Catalog/catalog";
import { Home } from "./pages/Home/Home";
import { Soda } from "./pages/Soda/Soda";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login/login';
import { ResetPassword } from './pages/ResetPassword/resetPassword';
import { Register } from './pages/Register/register';
import { Confirm } from './pages/Confirm/confirm';
import { Profile } from './pages/Profile/profile';
import { PrivateRoute } from "./utils/privateroute";
import { Page404 } from "./pages/404error/notFound";
import { OrderForm } from './pages/orderForm/orderForm'; 
import { Provider } from 'react-redux';
import { store } from "./state/store";


ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Page404 />} />
                <Route path="/" element={<Home />} />
                <Route path="/order-form" element={<OrderForm />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/soda/:category/:color" element={<Soda />} />
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/confirm/:token" element={<Confirm />}/>
                <Route element={<PrivateRoute />}>
                    <Route path="/profile" element={<Profile />}/>
                </Route>
                <Route path="/reset-password/:token" element={<ResetPassword />}/>
            </Routes>
        </BrowserRouter>
    </Provider>

), document.getElementById("main"));