import {useState} from "react";
import AuthHttpService from "../services/authHttpService.ts";
import ILoginData from "../types/interfaces/iLoginData.ts";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const authHttpService = new AuthHttpService();
    const navigate = useNavigate();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();

        const loginData = extractLoginData(event);

        const isLoginSuccessful = await authHttpService.loginWithCredentials(loginData);

        if (isLoginSuccessful) {
            setIsAuthenticated(true);
            localStorage.setItem('authStatus', 'true');
            navigate(APP_ROUTES.USERS);
        }
        else {
            setIsAuthenticated(false);
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