import React from "react";
import { SearchComponent } from "../components/SearchComponent";
import '../styling/landingPage.css'

export const LandingPage = () =>{
    return(
    <div>
        <div>
            <h1 className="header-landingPage">Country</h1>
        </div>
        <div>
            <SearchComponent />
        </div>
    </div>
    )
}