import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Role } from '../../features/auth/types/enums/role';
import { IRoleContext, ROLE_PERMISSIONS } from '../../features/auth/types/interfaces/iRole';

const ROLE_STORAGE_KEY = 'userRole';

export const RoleContext = createContext<IRoleContext | undefined>(undefined);

interface RoleProviderProps {
    children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
    const [role, setRoleState] = useState<Role | null>(() => {
        // Initialize from localStorage with error handling
        try {
            const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
            if (storedRole && Object.values(Role).includes(storedRole as Role)) {
                return storedRole as Role;
            }
            return null;
        } catch (error) {
            console.error('Error reading role from localStorage:', error);
            return null;
        }
    });

    const setRole = (newRole: Role) => {
        try {
            if (!newRole || !Object.values(Role).includes(newRole)) {
                console.error('Invalid role provided:', newRole);
                return;
            }
            setRoleState(newRole);
            localStorage.setItem(ROLE_STORAGE_KEY, newRole);
        } catch (error) {
            console.error('Error saving role to localStorage:', error);
            // Still update state even if localStorage fails
            setRoleState(newRole);
        }
    };

    const clearRole = () => {
        try {
            setRoleState(null);
            localStorage.removeItem(ROLE_STORAGE_KEY);
        } catch (error) {
            console.error('Error removing role from localStorage:', error);
            // Still clear state even if localStorage fails
            setRoleState(null);
        }
    };

    const permissions = role ? ROLE_PERMISSIONS[role] : {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canView: false,
    };

    useEffect(() => {
        // Sync with localStorage changes (e.g., from other tabs)
        const handleStorageChange = (e: StorageEvent) => {
            try {
                if (e.key === ROLE_STORAGE_KEY) {
                    const newRole = e.newValue;
                    if (newRole && Object.values(Role).includes(newRole as Role)) {
                        setRoleState(newRole as Role);
                    } else {
                        setRoleState(null);
                    }
                }
            } catch (error) {
                console.error('Error handling storage change:', error);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <RoleContext.Provider value={{ role, permissions, setRole, clearRole }}>
            {children}
        </RoleContext.Provider>
    );
};
