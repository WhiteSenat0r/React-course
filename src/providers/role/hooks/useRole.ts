import { useContext } from 'react';
import { RoleContext } from '../RoleProvider';
import { IRoleContext } from '../../../features/auth/types/interfaces/iRole';

export const useRole = (): IRoleContext => {
    const context = useContext(RoleContext);

    if (context === undefined) {
        throw new Error('useRole must be used within a RoleProvider');
    }

    return context;
};
