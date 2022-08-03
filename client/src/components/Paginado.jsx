import React from "react";
import styles from "../styles/Paginado.module.css";

function Paginado({ allCountries, paginado }) {
    
    const pageNumbers = [];
    const countriesAfter1 = allCountries - 9

    pageNumbers.push(1)

    for (let i = 2; i < Math.ceil(countriesAfter1 / 12); i++) {
        pageNumbers.push(i)
    }
 
    return (
        <nav className={styles.pagContainer}>         
            <div>
                {pageNumbers?.map(number => (
                    <button
                        className={styles.numbers}
                        key={number}
                        onClick={() => paginado(number)}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </nav>
    );
}

export default Paginado;