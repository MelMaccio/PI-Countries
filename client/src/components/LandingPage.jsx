import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Landing.module.css";

function LandingPage() {
    return (
        <div className={styles.bkg}>
            <h1>Welcome to the Countries App!</h1>
            <NavLink className={styles.NavLink}to={'/countries'} exact>
                <button className={styles.button}>Explore Countries</button>
            </NavLink>
        </div>
    );
}

export default LandingPage;