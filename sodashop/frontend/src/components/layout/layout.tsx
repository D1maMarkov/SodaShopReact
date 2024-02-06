import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./layout.scss";

export const Layout: FC = () => {
    return (
        <Outlet />
    )
}