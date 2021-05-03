import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { updateUser } from "../Singin/reducer/action";
import { updateJournals } from "../Singin/reducer/action";
import { IState, IUser } from '../../interfaces';

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

export default function Bar(): JSX.Element {
  const classes = useStyles();
  const user = useSelector((state: IState) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [redirect, setRedirect] = useState(false);
  const [redirectMyFavorities, setRedirectMyFavorities] = useState(false);
  const [redirectIndex, setRedirectIndex] = useState(false);

  const logout = () => {
    setRedirect(true);
    dispatch(updateUser({} as IUser))
    dispatch(updateJournals([]))
  }

  const redirectToMyJournals = () => {
    setRedirectMyFavorities(true);
  }

  const redirectToIndex = () => {
    setRedirectIndex(true)
  }

  const renderRedirect = () => {
    if (redirect) {
      history.push('/');
    } else if (redirectMyFavorities) {
      setRedirectMyFavorities(false);
      history.push('/dashboard/favorities');
    } else if (redirectIndex) {
      setRedirectIndex(false)
      history.push('/dashboard/index');
    }
  }

  return (
    <React.Fragment>
      <div>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar >
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              {`Welcome back to the best Journal repository ${user.user.name}`}
            </Typography>
            <nav>
              <Link variant="button" color="textPrimary" href="#" className={classes.link} onClick={() => redirectToIndex()}>
                Index
            </Link>
            </nav>
            <nav>
              <Link variant="button" color="textPrimary" href="#" className={classes.link} onClick={() => redirectToMyJournals()}>
                My Favorites Journals
            </Link>
            </nav>
            <Button href="#" color="primary" variant="outlined" className={classes.link} onClick={() => logout()}>
              Logout
          </Button>
          </Toolbar>
        </AppBar>
        {renderRedirect()}
      </div>
    </React.Fragment>

  );
}