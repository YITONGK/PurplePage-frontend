// LoginPage.js
import React, { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { LoginButton, MicrosoftLogo} from './LoginPageElement';
import '../App.css'


function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        const loginRequest = {
            scopes: ['User.Read']
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
    const { instance, accounts } = useMsal();

    useEffect(() => {
        const getToken = () => {
            try {
                const loginRequest = {
                    scopes: ['User.Read']
                };

                // Check if there is an active account
                if (accounts.length > 0) {
                    instance.acquireTokenSilent({
                        account: accounts[0],
                        scopes: loginRequest.scopes,
                    })
                    .then((tokenResponse) => {
                        console.log(tokenResponse);
                        document.cookie = `accessToken=${tokenResponse.idToken};`;
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                } else {
                    // Handle the case where there is no active account
                    console.error('No active account. Please sign in.');
                }

            } catch (error) {
                console.error(error);
            }
        };

        getToken();
    }, [instance, accounts]);

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

