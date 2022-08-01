import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css";

function CountryCard({ flag, name, continent, id }) {
    return (
        <div className={styles.card}>
            <Link to={`/countries/${id}`} className={styles.Link}>
                <img src={flag} alt="" />
                <h3>{name}</h3>
            </Link>
            <p>{`Continent: ${continent}`}</p>
        </div>
    );
}

export default CountryCard;