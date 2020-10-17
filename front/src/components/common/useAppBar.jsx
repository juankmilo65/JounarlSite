import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from "../Singin/reducer/action";

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
          margin: 0,
          padding: 0,
          listStyle: 'none',
        },
      },
      appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      toolbarTitle: {
        flexGrow: 1,
      },
      link: {
        margin: theme.spacing(1, 1.5),
      },
}));

export default function Bar() {
    const classes = useStyles();
    const user = useSelector(state=> state.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const [redirect, setRedirect] = useState(false);

    const logout = () => {
        setRedirect(true);
        dispatch(updateUser({}))
    }

    const renderRedirect = () => {
        if (redirect) {
          history.push('/');
        }
    }

return (
    <React.Fragment>
        <div> 
      <CssBaseline />
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          {`Welcome back to the best Journal repository ${user.user.name}`} 
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
            My Journals
            </Link>
          </nav>
          <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={()=> logout()}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {renderRedirect()}
      </div>
      </React.Fragment>
      
);
}