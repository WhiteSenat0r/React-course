import React from "react";
import {FormControlLabel, Switch} from "@mui/material";
import {useColorMode} from "../../providers/theme/hooks/useColorMode.ts";

export const ColorModeSwitch: React.FC = () => {
    const { toggleColorMode } = useColorMode();

    return(
        <FormControlLabel control={<Switch defaultChecked onClick={toggleColorMode}/>} label="Color Mode" />
    )
}