import React from 'react';
import { useMsal } from '@azure/msal-react';
import { LoginButton, MicrosoftLogo} from './LoginButtonElement';


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

export default SignInButton;


