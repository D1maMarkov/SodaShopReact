import ReactDOM from 'react-dom';
import { Catalog } from "./pages/catalog/catalog";
import { Home } from "./pages/home/home";
import { Soda } from "./pages/soda/soda";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/login/login';
import { ResetPassword } from './pages/resetPassword/resetPassword';
import { Register } from './pages/register/register';
import { Confirm } from './pages/confirm/confirm';
import { Profile } from './pages/profile/profile';
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