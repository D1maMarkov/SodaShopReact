import React from "react";
import ReactDOM from 'react-dom';
import Catalog from "./Catalog";
import { Home } from "./Home";
import { Soda } from "./components/SodaComponent/Soda";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './components/user/login';
import { Register } from './components/user/register';
import { Confirm } from "./components/user/confirm";
import { Profile } from "./components/user/profile";
import { PrivateRoute } from "./utils/privateroute";
import { Page404 } from "./components/404error/notFound";
import { SendLocation } from "./components/orderForm/orderForm";


ReactDOM.render((
    <BrowserRouter>
        <Routes>
            <Route path="*" element={<Page404 />} />
            <Route path="/" element={<Home />} />
            <Route path="/orderForm" element={<SendLocation />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/soda/:category/:color" element={<Soda />} />
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/confirm" element={<Confirm />}/>
            <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<Profile />}/>
            </Route>
        </Routes>
    </BrowserRouter>

), document.getElementById("main"));