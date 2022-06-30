import React, { useState, useEffect } from "react";
import '../styling/searchComponent.css'
import { useNavigate } from "react-router-dom";
import API from "../API/searchApi";

export const SearchComponent = () =>{
    const [value, setValue] = useState()
    const [active, setActive] = useState(false)
    const [checkInput,setCheckInput] = useState('')

    const navigate = useNavigate()

    const handleSearch = async (input) =>{
        try {
            setCheckInput(input)
            if(checkInput === '' | undefined) return null
            const server = await API.get(`${input}`)
            const data = server.data
            const sortedData = data.slice(0,5)
            setValue(sortedData)

            setActive(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(checkInput === ''){
            setActive(false)
        }
    },[checkInput])
    console.log(checkInput);

    const handleClick = (e) =>{
        let params = e.name.common
        navigate(`/result/${params}`)
    }

    return(
    <div className="container-searchComponent">
        <div className="content-searchComponent">
            <input 
            className="input-searchComponent"
            placeholder="Type any country name"
            onChange={e => handleSearch(e.target.value)}
            />
            {active?
                <ul>
                    {value&&value.map((e,i)=>
                    <li onClick={() => handleClick(e)} className="li-searchComponent" key={i}>{e.name.common}</li>
                    )}
                </ul>
            :null}
        </div>
    </div>
    )
}