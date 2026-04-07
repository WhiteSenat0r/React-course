import { Role } from '../enums/role';

export interface IRolePermissions {
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    canView: boolean;
}

export interface IRoleContext {
    role: Role | null;
    permissions: IRolePermissions;
    setRole: (role: Role) => void;
    clearRole: () => void;
}

// Default role mappings based on email
export const EMAIL_ROLE_MAPPINGS: Record<string, Role> = {
    'george.bluth@reqres.in': Role.ADMIN,
    'janet.weaver@reqres.in': Role.MANAGER,
    'emma.wong@reqres.in': Role.USER,
    'eve.holt@reqres.in': Role.ADMIN,
    'charles.morris@reqres.in': Role.MANAGER,
    'tracey.ramos@reqres.in': Role.USER,
};

// Permission mappings for each role
export const ROLE_PERMISSIONS: Record<Role, IRolePermissions> = {
    [Role.ADMIN]: {
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canView: true,
    },
    [Role.MANAGER]: {
        canCreate: false,
        canEdit: true,
        canDelete: false,
        canView: true,
    },
    [Role.USER]: {
        canCreate: false,
        canEdit: false,
        canDelete: false,
        canView: true,
    },
};
