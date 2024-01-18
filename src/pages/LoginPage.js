// LoginPage.js
import React from 'react';
import { useMsal } from '@azure/msal-react';
import { LoginButton, MicrosoftLogo} from './LoginPageElement';
import '../App.css';


function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        const loginRequest = {
            scopes: ['User.Read'],
        };

        if (loginType === 'popup') {
            instance.loginPopup(loginRequest).catch(e => {
                console.error(e);
            });

        } else {
           instance.loginRedirect(loginRequest).catch(e => {
               console.error(e);
           });
        }
    };

    return (
        <LoginButton onClick={() => handleLogin('')} disableRipple>
            <MicrosoftLogo></MicrosoftLogo>
            Login with Uniting Account
        </LoginButton>
    );
}

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

