import {useState} from "react";
import AuthHttpService from "../services/authHttpService.ts";
import ILoginData from "../types/interfaces/iLoginData.ts";
import {useNavigate} from "react-router-dom";
import {APP_ROUTES} from "../../../shared/variables/appRoutes.ts";
import {Role} from "../types/enums/role.ts";
import {useRole} from "../../../providers/role/hooks/useRole.ts";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined);
    const [showRoleSelection, setShowRoleSelection] = useState<boolean>(false);
    const [userEmail, setUserEmail] = useState<string>('');
    const authHttpService = new AuthHttpService();
    const navigate = useNavigate();
    const { setRole } = useRole();

    const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) : Promise<void> => {
        event.preventDefault();

        const loginData = extractLoginData(event);

        const isLoginSuccessful = await authHttpService.loginWithCredentials(loginData);

        if (isLoginSuccessful) {
            setIsAuthenticated(true);
            localStorage.setItem('authStatus', 'true');
            setUserEmail(loginData.email);
            setShowRoleSelection(true);
        }
        else {
            setIsAuthenticated(false);
        }
    };

    const handleRoleSelected = (selectedRole: Role) => {
        setRole(selectedRole);
        setShowRoleSelection(false);
        navigate(APP_ROUTES.USERS);
    };

    const extractLoginData = (event: React.FormEvent<HTMLFormElement>): ILoginData => {
        const data = new FormData(event.currentTarget);

        return {
            email: data.get('email')!.toString(),
            password: data.get('password')!.toString(),
        };
    };

    return { isAuthenticated, handleSignIn, showRoleSelection, userEmail, handleRoleSelected };
};

export default useAuth;