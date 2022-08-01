import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCountryDetail } from "../actions";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Detail.module.css";

function CountryDetail(props) {
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(getCountryDetail(props.match.params.id))
   }, [dispatch, props.match.params.id]
   )

   const myCountry = useSelector((state) => state.details)


   return (
      <div className={styles.container}>
         <div className={styles.navBar}>
            <NavBar />
            <SearchBar />
         </div>
         {myCountry ?
            <div className={styles.detailCard}>
               <img src={myCountry.flag} alt="" />
               <div className={styles.info}>
                  <h1>{myCountry.name}</h1>
                  <p>Id: {myCountry.id}</p>
                  <p>Capital: {myCountry.capital}</p>
                  <p>Continent: {myCountry.continent}</p>
                  <p>Subregion: {myCountry.subregion}</p>
                  <p>Area: {myCountry.area}</p>
                  <p>Population: {myCountry.population}</p>
                  <p>Activities: </p>
                  {myCountry.activities?.map(a => (
                     <p key={a.id}>{a.name}</p>
                  ))}
                  <NavLink to="/countries">
                     <button className={styles.button}>Go Back</button>
                  </NavLink>
               </div>
            </div>
            : <p>Loading...</p>}
      </div>
   );
}

export default CountryDetail;

