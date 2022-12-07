import { Grid } from "@mui/material";
import React from 'react';
import Logo from '../../assets/Logo.png';
import './index.styles.css';

const AppHeader = () => {
return (
    <Grid container  className="sm-header-container" justifyContent="center" alignItems="center" alignContent="center">
    <Grid item xs sx={{ mt: 2}}>
        <img src={Logo} alt="logo" style={{maxHeight: "150px", width: "100%", objectFit: "contain"}} />
    </Grid>
    </Grid>
)
};

export default AppHeader;