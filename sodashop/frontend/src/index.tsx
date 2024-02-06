import ReactDOM from 'react-dom';
import Catalog from "./pages/catalog/catalog";
import Soda from "./pages/soda/soda";
import { Provider } from 'react-redux';
import { store } from "./state/store";
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Layout } from './components/layout/layout'

const Home = lazy(() => import("./pages/home/home"))
const Login = lazy(() => import("./pages/login/login"))
const Register = lazy(() => import("./pages/register/register"))
const ResetPassword = lazy(() => import("./pages/resetPassword/resetPassword"))
const Confirm = lazy(() => import("./pages/confirm/confirm"))
const Profile = lazy(() => import("./pages/profile/profile"))
const Page404 = lazy(() => import("./pages/404error/notFound"))
const OrderForm = lazy(() => import("./pages/orderForm/orderForm"))
const PrivateRoute = lazy(() => import("./utils/privateroute"))

const routes = [
    { path: '*', component: <Page404 /> },
    { path: '/', component: <Home />},
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
                <Route path="/" element={<Suspense><Layout /></Suspense>}>
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
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>

), document.getElementById("main"));