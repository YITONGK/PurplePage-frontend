import { PublicClientApplication } from '@azure/msal-browser';

export const msalConfig = {
    auth: {
        clientId: '788cf6e0-220f-4228-a961-67e18d97e10f', // This is the ONLY mandatory field that you need to supply.
        authority: 'https://login.microsoftonline.com/ea913fd5-8fd8-47c7-8f3f-8117e1a387dc', // Defaults to "https://login.microsoftonline.com/common"
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true, // set to true for IE 11
    },
};

export const msalInstance = new PublicClientApplication(msalConfig);
