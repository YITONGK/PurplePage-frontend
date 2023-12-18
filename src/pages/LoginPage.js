// LoginPage.js
import React from 'react';
import { useMsal } from '@azure/msal-react';

function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        const loginRequest = {
            scopes: ['User.Read'] // Add other scopes as needed
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
        <button onClick={() => handleLogin('popup')}>Sign In with Microsoft</button>
    );
}

function LoginPage() {
    return (
        <div>
            <h2>Please sign in to continue</h2>
            <SignInButton />
        </div>
    );
}

export default LoginPage;
