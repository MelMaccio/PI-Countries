import React from "react";
import { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postActivity, getCountries } from "../actions";
import validate from "../utils/validation";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import styles from "../styles/Form.module.css";

function CreateActivity() {
    const dispatch = useDispatch()

    const history = useHistory()

    const allCountries = useSelector((state) => state.countries)

    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name: "",
        dificulty: "",
        duration: "",
        season: "",
        countryIds: []
    })

    const hours = [];
    for (let i = 1; i <= 24; i++) {
        hours.push(i)
    }

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])


    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(
            validate({ ...input, [e.target.name]: e.target.value })
        )
    }

    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                season: e.target.value
            })
            setErrors(
                validate({ ...input, [e.target.name]: e.target.value })
            )
        }
    }

    function handleSelect(e) {
        if (e.target.name === "countryIds") {
            let exists = input.countryIds.find((c) => c === e.target.value);
            if (!exists) {
                setInput({
                    ...input,
                    [e.target.name]: [...input.countryIds, e.target.value]
                })
                setErrors(
                    validate({ ...input, [e.target.name]: e.target.value })
                )
            }
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
        }
    }

    function handleDelete(e) {
        let notDeleted = input.countryIds.filter(id => id !== e.target.value)
        setInput({
            ...input,
            countryIds: notDeleted
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        console.log(input)
        dispatch(postActivity(input))
        alert("Activity created successfully!")
        setInput({
            name: "",
            dificulty: "",
            duration: "",
            season: "",
            countryIds: []
        })
        setErrors({})
        history.push('/countries')
    }

    return (
        <div className={styles.container}>
            <div className={styles.navBar}>
                <NavBar />
                <SearchBar />
            </div>
            <h1>Create Activity</h1>
            <form onSubmit={(e) => handleSubmit(e)} className={styles.form}>
                <div>
                    <label>Activity name: </label>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        className={styles.nameInput}
                        onChange={(e) => handleChange(e)}
                    />
                    <p className={styles.error}>{errors.name}</p>
                </div>
                <div>
                    <label>Difficulty: </label>
                    <select 
                     name="dificulty" 
                     value={input.dificulty} 
                     onChange={(e) => handleSelect(e)} 
                     required
                    >
                        <option value="" selected disabled>Select...</option>
                        <option value="1">1: Very Easy</option>
                        <option value="2">2: Easy</option>
                        <option value="3">3: Medium</option>
                        <option value="4">4: Hard</option>
                        <option value="5">5: Very Hard</option>
                    </select>
                </div>
                <div>
                    <label>Duration-hs: </label>
                    <select 
                     name="duration" 
                     value={input.duration} 
                     onChange={(e) => handleSelect(e)} 
                     required
                    >
                        <option value="" selected disabled>Select...</option>
                        {hours?.map(h => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Season: </label>
                    <label>
                        <input type="radio" name="season" value="summer" onChange={(e) => handleCheck(e)} />
                        Summer
                    </label>
                    <label>
                        <input type="radio" name="season" value="autumn" onChange={(e) => handleCheck(e)} />
                        Autumn
                    </label>
                    <label>
                        <input type="radio" name="season" value="winter" onChange={(e) => handleCheck(e)} />
                        Winter
                    </label>
                    <label>
                        <input type="radio" name="season" value="spring" onChange={(e) => handleCheck(e)} />
                        Spring
                    </label>
                    <p className={styles.error}>{errors.season}</p>
                </div>
                <div>
                    <h3>Select countries: </h3>
                    <select 
                     name="countryIds" 
                     value={input.countryIds[input.countryIds.length - 1] ?? ''} 
                     onChange={(e) => handleSelect(e)}
                    >
                        <option value="" selected disabled>Select...</option>
                        {allCountries?.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
                <h3>Countries Selected</h3>
                <div className={styles.selection}>
                    {input.countryIds && input.countryIds.map(id => (
                        <div key={id}>
                            <p>{id}</p>
                            <button
                                value={id}
                                onClick={(e) => handleDelete(e)}
                                className={styles.delete}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <p className={styles.error}>{errors.countryIds}</p>
                </div>
                <button type="submit" className={styles.button}>Create</button>
                <Link to='/countries'>
                    <button className={styles.button}>Go Back</button>
                </Link>
            </form>

        </div>
    );
}

export default CreateActivity;
