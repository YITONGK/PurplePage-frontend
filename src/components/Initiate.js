import { useMsal } from '@azure/msal-react';

function SignInButton() {
    const { instance } = useMsal();

    const handleLogin = (loginType) => {
        if (loginType === 'popup') {
            instance.loginPopup(loginRequest).catch(e => {
                // handle errors
            });
        } else {
            instance.loginRedirect(loginRequest).catch(e => {
                // handle errors
            });
        }
    };

    return (
        <button onClick={() => handleLogin('popup')}>Sign In</button>
    );
}