import React from "react";
import styles from './home.module.scss'

import { Header } from "../../shared/header/Header";
import { ThisDay } from "./components/thisDay/ThisDay";
import { ThisDayInfo } from "./components/thisDayInfo/ThisDayInfo";
import { Days } from "./components/Days/Days";

export const Home: React.FC = () => {

    return (
        <>
            <Header />
            <section className={`${styles.resset} ${styles.flex}`}>
                <ThisDay />
                <ThisDayInfo />
            </section>
            <Days/>
        </>
    );
};
