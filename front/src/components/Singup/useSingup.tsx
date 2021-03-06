import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import UseAlertDialog from "../common/useAlertDialog";
import UseSimpleBackdrop from "../common/useSimpleBackdrop";
// import { apiServices } from "../../configuration/constant";
import UseCopyright from "../common/useCopyright";
import axios from 'axios';
import { IFromEvent } from '../../interfaces';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function UseSignUp() {
  const classes = useStyles();
  const history = useHistory();
  const [openSpinner, setOpenSpinner] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userLog, setUserLog] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");

  const singUp = async (e: IFromEvent) => {
    e.preventDefault();
    setOpenSpinner(true);
    // await axios.post(apiServices + "/user/createUser", {
    await axios.post("/user/createUser", {
      "userName": userLog,
      "password": password,
      "name": name,
      "lastname": lastName
    }).then(res => {
      setOpenSpinner(false);
      setMessage(res.data.message);
    }).catch(error => {
      setMessage("Error processing your data");
    });
  }

  const redirectIndex = () => {
    setRedirect(true);
  }
  const handleOk = () => {
    if (message === 'User Successfully Created.') {
      redirectIndex();
    }
    setMessage("");

  }

  const renderRedirect = () => {
    if (redirect) {
      history.push('/');
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <UseSimpleBackdrop isActive={openSpinner} />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={(e) => singUp(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={event => {
                  const { value } = event.target;
                  setName(value);
                }}

              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={event => {
                  const { value } = event.target;
                  setLastName(value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="User name"
                name="email"
                autoComplete="email"
                onChange={event => {
                  const { value } = event.target;
                  setUserLog(value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => {
                  const { value } = event.target;
                  setPassword(value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2" onClick={() => redirectIndex()}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <UseCopyright />
      </Box>
      {message !== "" ? <UseAlertDialog message={message} onChange={handleOk} /> : <div></div>}
      {renderRedirect()}
    </Container>
  );
}

export default UseSignUp