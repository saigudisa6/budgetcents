import { handleAuth, handleLogin, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
    signup: handleLogin({ 
        authorizationParams: { screen_hint: "signup" },
        returnTo: '/memberForm' // Redirect to /dashboard after successful signup
    }),

    async login(req: NextApiRequest, res: NextApiResponse) {
        // Redirect to /generateRecipes after successful login
        await handleLogin(req, res, {
          returnTo: '/profile',
        });
    },
});