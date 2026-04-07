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

        try {
            const loginData = extractLoginData(event);

            const isLoginSuccessful = await authHttpService.loginWithCredentials(loginData);

            if (isLoginSuccessful) {
                setIsAuthenticated(true);
                try {
                    localStorage.setItem('authStatus', 'true');
                } catch (storageError) {
                    console.error('Error saving auth status to localStorage:', storageError);
                    // Continue with authentication even if localStorage fails
                }
                setUserEmail(loginData.email);
                setShowRoleSelection(true);
            }
            else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error during sign in:', error);
            setIsAuthenticated(false);
        }
    };

    const handleRoleSelected = (selectedRole: Role) => {
        try {
            if (!selectedRole || !Object.values(Role).includes(selectedRole)) {
                console.error('Invalid role selected:', selectedRole);
                return;
            }
            setRole(selectedRole);
            setShowRoleSelection(false);
            navigate(APP_ROUTES.USERS);
        } catch (error) {
            console.error('Error handling role selection:', error);
            // Attempt to navigate anyway to prevent user from being stuck
            setShowRoleSelection(false);
        }
    };

    const extractLoginData = (event: React.FormEvent<HTMLFormElement>): ILoginData => {
        try {
            const data = new FormData(event.currentTarget);
            const email = data.get('email');
            const password = data.get('password');

            if (!email || !password) {
                throw new Error('Email and password are required');
            }

            return {
                email: email.toString(),
                password: password.toString(),
            };
        } catch (error) {
            console.error('Error extracting login data:', error);
            throw error;
        }
    };

    return { isAuthenticated, handleSignIn, showRoleSelection, userEmail, handleRoleSelected };
};

export default useAuth;