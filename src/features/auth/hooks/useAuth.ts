import {useState} from "react";
import AuthHttpService from "../services/authHttpService.ts";
import ILoginData from "../types/interfaces/iLoginData.ts";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const authHttpService = new AuthHttpService();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();
        const loginData = extractLoginData(event);

        const isLoginSuccessful = await authHttpService.loginWithCredentials(loginData);

        if (isLoginSuccessful) {
            localStorage.setItem('authStatus', 'true');
            setIsAuthenticated(true);
        }
    };

    const extractLoginData = (event: React.FormEvent<HTMLFormElement>): ILoginData => {
        const data = new FormData(event.currentTarget);

        return {
            email: data.get('email')!.toString(),
            password: data.get('password')!.toString(),
        };
    };

    return { isAuthenticated, handleSignIn };
};

export default useAuth;