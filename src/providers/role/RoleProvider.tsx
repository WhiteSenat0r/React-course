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
        // Initialize from localStorage
        const storedRole = localStorage.getItem(ROLE_STORAGE_KEY);
        return storedRole ? (storedRole as Role) : null;
    });

    const setRole = (newRole: Role) => {
        setRoleState(newRole);
        localStorage.setItem(ROLE_STORAGE_KEY, newRole);
    };

    const clearRole = () => {
        setRoleState(null);
        localStorage.removeItem(ROLE_STORAGE_KEY);
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
            if (e.key === ROLE_STORAGE_KEY) {
                setRoleState(e.newValue ? (e.newValue as Role) : null);
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
