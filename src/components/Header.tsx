import React, { useContext, useState } from "react";
import { dig } from "dig-ts";
import { signInWithGoogle, logOut } from "../service/firebase";
import { useAuthContext } from "../providers/AuthProvider";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  toolbar: {
    justifyContent: 'space-between'
  }
}))

const Header = () => {
  const [value, setValue] = useState();
  const useAuth = useAuthContext();
  const button = () => {
    let butttonDom;

    if (useAuth) {
      butttonDom = <Button color="inherit" onClick={ logOut }>ログアウト</Button>
    } else {
      butttonDom = <Button color="inherit" onClick={ signInWithGoogle }>ログイン</Button>
    }
    return butttonDom
  }
  const classes = useStyles();
  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className={ classes.toolbar }>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          { button() }
        </Toolbar>
      </AppBar>
    </Box>
    // <header>
    //   ヘッダー
    //   { button() }
    // </header>

  )
}

export default Header;
