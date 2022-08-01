import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByActivity, filterByContinent, getActivities, getCountries, orderByName, orderByPopulation } from "../actions";
import styles from "../styles/Home.module.css";
import CountryCard from "./CountryCard";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";


function Home() {
   const dispatch = useDispatch()
   const allCountries = useSelector((state) => state.countries) 
   const activities = useSelector((state) => state.activities)
   const [currentPage, setCurrentPage] = useState(1)
   const [countriesPerPage, setCountriesPerPage] = useState(9)
   const [currentCountries, setCurrentCountries] = useState([])
   const [order, setOrder] = useState('')
   

   function paginado(pageNumber) {          
      if (pageNumber === 1) {
         let start = 0
         let end = 9 
         setCurrentCountries(allCountries.slice(start, end))
      } else {
         let start = ((pageNumber - 2) * 12) + 9
         let end =  start + 12
         setCurrentCountries(allCountries.slice(start, end))
      }

      setCurrentPage(pageNumber)
   }

   useEffect(() => {
      dispatch(getCountries())
      dispatch(getActivities()) 
   }, [dispatch])               

   
   useEffect(() => {
      paginado(1)
   }, [allCountries])


   function handleOnClick(e) {   
      e.preventDefault()        
      dispatch(getCountries())
      paginado(1)
   }

   function handleFilterContinent(e) {
      dispatch(filterByContinent(e.target.value))
      e.target.value = ''
   }

   function handleActivityFilter(e) {
      dispatch(filterByActivity(e.target.value))
      e.target.value = ''
   }

   function handleAlphOrder(e) {
      e.preventDefault()
      dispatch(orderByName(e.target.value))
      setCurrentPage(1)
      paginado(1)
      setOrder(`Ordered ${e.target.value}`)
      e.target.value = ''
   }

   function handlePopOrder(e) {
      e.preventDefault()
      dispatch(orderByPopulation(e.target.value))
      setCurrentPage(1)
      setOrder(`Ordered ${e.target.value}`)
      e.target.value = ''
   }

   return (
      <div className={styles.container}>
         <div className={styles.navBar}>
            <NavBar />
            <SearchBar />
         </div>
         <div className={styles.filters}>
            <select className={styles.select} onChange={(e) => handlePopOrder(e)}>
               <option value= '' disabled selected>Order by population</option>
               <option value='asc'>ASC</option>
               <option value='desc'>DESC</option>
            </select>
            <select className={styles.select} onChange={(e) => handleAlphOrder(e)}>
               <option value= '' disabled selected>Alphabetical order</option>
               <option value='az'>A-Z</option>
               <option value='za'>Z-A</option>
            </select>
            <select className={styles.select} onChange={(e) => handleFilterContinent(e)}>
               <option value= '' disabled selected>Continent</option>
               <option value='Africa'>AFRICA</option>
               <option value='America'>AMERICA</option>
               <option value='Antarctica'>ANTARCTICA</option>
               <option value='Asia'>ASIA</option>
               <option value='Europe'>EUROPE</option>
               <option value='Oceania'>OCEANIA</option>
            </select>
            <select className={styles.select} onChange={(e) => handleActivityFilter(e)}>
               <option value= '' disabled selected>Activity</option>
               {activities.length > 0 && activities.map(el => (
                  <option key={el.id} value={el.name}>{el.name}</option>
               ))}
            </select>
            <button className={styles.button} onClick={(e) => { handleOnClick(e) }}>Reset</button>
         </div>
         <Paginado
            allCountries={allCountries.length}
            countriesPerPage={countriesPerPage}
            paginado={paginado}
         />
         <div className={styles.countries}>
            {currentCountries?.map(el => (
               <CountryCard
                  key={el.id}
                  flag={el.flag}
                  name={el.name}
                  continent={el.continent}
                  id={el.id}
               />
            ))}
         </div>
      </div>
   );
}

export default Home;