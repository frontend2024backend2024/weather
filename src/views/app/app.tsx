import React from "react";
import style from './app.module.scss'

//import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import { Home } from "../../pages/home/home";

//import { Popup } from "../../shared/Popup";

export const App: React.FC = () => {

    return (
        <>  
            {/* <div className={style.popup__container}>
    <Popup />
</div> */}
            <section className={style.container}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </section>
        </>
    );
}