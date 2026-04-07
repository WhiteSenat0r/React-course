import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Typography,
    Box,
} from '@mui/material';
import { Role } from '../types/enums/role';
import { EMAIL_ROLE_MAPPINGS } from '../types/interfaces/iRole';

interface RoleSelectionDialogProps {
    open: boolean;
    email: string;
    onRoleSelected: (role: Role) => void;
}

const RoleSelectionDialog: React.FC<RoleSelectionDialogProps> = ({ open, email, onRoleSelected }) => {
    // Get suggested role based on email, default to USER
    const suggestedRole = EMAIL_ROLE_MAPPINGS[email] || Role.USER;
    const [selectedRole, setSelectedRole] = useState<Role>(suggestedRole);
    const [error, setError] = useState<string>('');

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const newRole = event.target.value as Role;
            if (Object.values(Role).includes(newRole)) {
                setSelectedRole(newRole);
                setError('');
            } else {
                setError('Invalid role selected');
            }
        } catch (error) {
            console.error('Error handling role change:', error);
            setError('Error selecting role. Please try again.');
        }
    };

    const handleConfirm = () => {
        try {
            if (!selectedRole || !Object.values(Role).includes(selectedRole)) {
                setError('Please select a valid role');
                return;
            }
            onRoleSelected(selectedRole);
            setError('');
        } catch (error) {
            console.error('Error confirming role:', error);
            setError('Error confirming role. Please try again.');
        }
    };

    const getRoleDescription = (role: Role): string => {
        switch (role) {
            case Role.ADMIN:
                return 'Full access: Create, edit, delete, and view users';
            case Role.MANAGER:
                return 'Limited access: Edit and view users (no create/delete)';
            case Role.USER:
                return 'Read-only access: View users only';
            default:
                return '';
        }
    };

    return (
        <Dialog open={open} maxWidth="sm" fullWidth disableEscapeKeyDown>
            <DialogTitle>Select Your Role</DialogTitle>
            <DialogContent>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                        Please select your role to continue. Your permissions will be based on this selection.
                    </Typography>
                </Box>
                {error && (
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="error">
                            {error}
                        </Typography>
                    </Box>
                )}
                <FormControl component="fieldset" fullWidth>
                    <FormLabel component="legend" sx={{ mb: 1 }}>Available Roles</FormLabel>
                    <RadioGroup value={selectedRole} onChange={handleRoleChange}>
                        <FormControlLabel
                            value={Role.ADMIN}
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                        Admin
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {getRoleDescription(Role.ADMIN)}
                                    </Typography>
                                </Box>
                            }
                            sx={{ mb: 2, alignItems: 'flex-start' }}
                        />
                        <FormControlLabel
                            value={Role.MANAGER}
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                        Manager
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {getRoleDescription(Role.MANAGER)}
                                    </Typography>
                                </Box>
                            }
                            sx={{ mb: 2, alignItems: 'flex-start' }}
                        />
                        <FormControlLabel
                            value={Role.USER}
                            control={<Radio />}
                            label={
                                <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                        User
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {getRoleDescription(Role.USER)}
                                    </Typography>
                                </Box>
                            }
                            sx={{ alignItems: 'flex-start' }}
                        />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 2 }}>
                <Button onClick={handleConfirm} variant="contained" fullWidth>
                    Continue
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RoleSelectionDialog;
