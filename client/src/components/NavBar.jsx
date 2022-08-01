import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css"



function NavBar() {
    return ( 
        <div className={styles.nav}>
            <Link className={styles.link} to="/countries">
               Home
            </Link>
            <Link className={styles.link} to="/activities">
               Create Activity
            </Link>
        </div>
     );
}

export default NavBar;