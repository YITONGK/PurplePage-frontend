import React from "react";
import SignInButton from "../components/LoginAuthentication/LoginButton";

function LoginPage() {

    return (

        <div className="loading-overlay2">
            <div className="loading-container">
                <span className="loading-text"><img src={require('../images/uniting-icon.png')}  style={{filter: 'brightness(0) invert(1)', width: '150px', height: 'auto', marginBottom: '10px'}} alt={"Uniting Logo"} /> </span>
                <span className="loading-text">Welcome to Uniting's Purple Page</span>
                <SignInButton />
            </div>
        </div>

    );
}

export default LoginPage;