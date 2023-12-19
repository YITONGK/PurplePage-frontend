// LoginPage.js
import React, { useState, useEffect, useRef} from 'react';
import { useMsal } from '@azure/msal-react';
import {InteractionRequiredAuthError} from "@azure/msal-browser";

// ... (import statements)

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
        <button onClick={() => handleLogin('')}>Sign In with Microsoft</button>
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
        <div>
            <h2>Please sign in to continue</h2>
            <SignInButton />
        </div>
    );
}

export default LoginPage;

