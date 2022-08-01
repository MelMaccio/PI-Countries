import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountry } from "../actions";
import styles from "../styles/SearchBar.module.css";

function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName]= useState("")

    function handleInputChange(e){
       setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNameCountry(name))
        setName("")
    }

    return ( 
        <div className={styles.sbContainer}>
            <input 
              value={name}
              className={styles.input}
              type="text"
              placeholder="Search..."
              onChange={(e)=>handleInputChange(e)}
            />
            <button
              className={styles.button} 
              type="submit"
              onClick={(e)=>handleSubmit(e)}
            >
                Search
            </button>
        </div>
     );
}

export default SearchBar;