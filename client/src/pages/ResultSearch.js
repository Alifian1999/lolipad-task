import React, { useState, useEffect} from "react";
import '../styling/resultSearch.css'
import { useNavigate, useParams } from "react-router-dom";
import API from "../API/resultApi";
import arrow from '../assets/Intersect.svg'


export const ResultSearch = () =>{
    const [country,setCountry] = useState('')
    const [flag,setFlag] = useState('')
    const [letIng,setLetlng] = useState([])
    const [capital,setCapital] = useState('')
    const [region,setRegion] = useState('')
    const [subRegion, setSubRegion] = useState('')
    const [countryCurrency, setCountryCurrency] = useState('')
    const [altSpellings, setAltSpellings] = useState([])
    const [callCode,setCallCode] = useState('')
    const [sameCurrency, setSameCurrency] = useState('')
    const [sameCallingCode, setSameCallingCode] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [hoverCurrency, setHoverCurrency] = useState(false)
    const [hoverCallingCode, setHoverCallingCode] = useState(false)

    const [displaySameCurrency, setDisplaySameCurrency] = useState()
    const [displaySameCallingCode, setDisplaySameCallingCode] = useState()

    const navigate = useNavigate()
    const params = useParams()
    const countryName = params.params

    
    useEffect(()=>{
      async function  getApi(){
        try {
            const server = await API.get(`https://restcountries.com/v2/name/${countryName}`)
            const data = server.data
   
            const callingCode = data[0].callingCodes
            const currency = data[0].currencies[0].code
            const dCountryName = data[0].name
            const dFlag = data[0].flags.svg
            const dLetlng = data[0].latlng
            const dCapital = data[0].capital
            const dRegion = data[0].region
            const dSubregion = data[0].subregion
            const dAltSpellings = data[0].altSpellings
   
           setCountry(dCountryName)
           setFlag(dFlag)
           setLetlng(dLetlng)
           setCapital(dCapital)
           setRegion(dRegion)
           setSubRegion(dSubregion)
           setCountryCurrency(currency)
           setAltSpellings(dAltSpellings)
           setCallCode(callingCode)
           setSameCallingCode(callingCode)
           setSameCurrency(currency)
           setIsLoading(false)
        } catch (error) {
            console.log(error);
        }}
       getApi()
    },[])

    useEffect(async()=>{
        if(isLoading) return null
        try {
            const serverCallingcode = await API.get(`https://restcountries.com/v2/callingcode/${sameCallingCode}`)
            const dataCallcode = serverCallingcode.data
            setSameCallingCode(dataCallcode)
    
            const serverCurrency = await API.get(`https://restcountries.com/v2/currency/${sameCurrency}`)
            const dataCurrency = serverCurrency.data
            setSameCurrency(dataCurrency)
        } catch (error) {
            console.log(error);
        }

    },[isLoading])

    function handleFocusCurrency(){
        if(sameCurrency.length === 0) return null
        const sortedDataCurrencyCode = sameCurrency.slice(0,5)
        setDisplaySameCurrency(sortedDataCurrencyCode)
        setHoverCurrency(true)
    }

    function handleFocusCallingCode(){
        if(sameCallingCode.length === 0) return null
        const sortedDataCallingCode = sameCallingCode.slice(0,5)
        setDisplaySameCallingCode(sortedDataCallingCode)
        setHoverCallingCode(true)
    }

    function handleMouseLeaveCallingCode (){
        setHoverCallingCode(false)
    }

    function handleMouseLeaveCurrency (){
        setHoverCurrency(false)
    }

    const clickHomepage = () =>{
        navigate('/')
    }
    return(
        <div className="container-result">
            <button className="button-result" onClick={()=> clickHomepage()}>Back to Homepage</button>
            <div>
                <div className="container-countryName">
                    <h1>{country}</h1>
                    <div>
                        <img className="container-image" src={flag} alt=""/>
                    </div>
                </div>
                <div>
                    {altSpellings&& altSpellings.map((e,i)=>
                        <span className="container-altSpellings" key={i}>{e}</span>
                    )}
                </div>
            </div>
            <div className="container-content-top">
                <div className="container-latLong">
                    <div>
                        <h1>LatLong</h1>
                        <div>
                            {letIng&& letIng.map((e,i)=>
                            <span key={i}>{parseInt(e)}.0</span>
                            )}
                            <img src={arrow} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="container-capital-region-subregion">
                    <div>
                        <span>Capital: {capital}</span>
                        <span>Region: {region}</span>
                        <span>Subregion: {subRegion}</span>
                    </div>
                </div>
            </div>
            <div className="container-content-bottom">
                <div className="container-calling-code">
                    <h1>Calling Code</h1>
                    <span>{callCode}</span>
                    <div className="display-same-value" onMouseLeave={handleMouseLeaveCallingCode}>
                        <p><span onMouseOver={handleFocusCallingCode}>{sameCallingCode?sameCallingCode.length:0} country</span> with this code</p>
                        {hoverCallingCode&&
                        <ul>
                            { displaySameCallingCode.map((e,i)=>
                                <li key={i}>{e.name}</li>
                            )}
                        </ul>
                        }
                    </div>
                </div>
                <div>
                    <h1>Currency</h1>
                    <span>{countryCurrency}</span>
                    <div className="display-same-value" onMouseLeave={handleMouseLeaveCurrency}>
                        <p ><span  onMouseOver={handleFocusCurrency}>{sameCurrency?sameCurrency.length:0} country</span>  with this currency</p>
                        {hoverCurrency&&
                        <ul>
                            {displaySameCurrency.map((e,i)=>
                                <li key={i}>{e.name}</li>
                            )}
                        </ul>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}