import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "ff912446-2408-46cd-b7dd-f217780e7bd5", // Your Azure App client ID
    authority: `https://login.microsoftonline.com/common`,
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
});
