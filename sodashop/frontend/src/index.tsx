import ReactDOM from 'react-dom';
import { Catalog } from "./pages/catalog/catalog";
import { Home } from "./pages/home/home";
import { Soda } from "./pages/soda/soda";
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
import { BrowserRouter, Route, Routes} from 'react-router-dom';


const routes = [
    { path: '*', component: <Page404 /> },
    { path: '/', component: <Home /> },
    { path: '/order-form', component: <OrderForm /> },
    { path: '/catalog', component: <Catalog /> },
    { path: '/soda/:category/:color', component: <Soda /> },
    { path: '/login', component: <Login /> },
    { path: '/register', component: <Register /> },
    { path: '/confirm/:token', component: <Confirm />},
    { path: '/profile', component: <PrivateRoute />, children: [{path: '', component: <Profile />}]},
    { path: '/reset-password/:token', component: <ResetPassword /> },
];

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={route.component}
                >
                    {route.children && route.children.map((childRoute, childIndex) => (
                    <Route
                        key={childIndex}
                        path={childRoute.path}
                        element={childRoute.component}
                    />
                    ))}
                </Route>
                ))}
            
            </Routes>
        </BrowserRouter>
    </Provider>

), document.getElementById("main"));