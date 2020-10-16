import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
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
import { updateUser} from "./reducer/action"
import { apiServices } from "../../configuration/constant";
import UseAlertDialog from "../common/useAlertDialog";
import UseSimpleBackdrop from "../common/useSimpleBackdrop";
import axios from 'axios';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
function UseSigIn (){
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state=> state.user)
    const [userLog, setUserLog] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [openSpinner, setOpenSpinner] = useState(false);

    const singIn = async () => {
      setOpenSpinner(true);
        await axios.post(apiServices+"/user/validateUsersByUserAndPassword", {
            "userName": userLog,
            "password": password
        }).then(res => {
            if(res.data.message === "Login OK")
            {
                dispatch(updateUser(res.data.user))
            }
            setOpenSpinner(false);
            setMessage(res.data.message);
        })
    }
    
    const handleClearMessage = () =>
    {
      setMessage(null);
    }

    return (
        <div>
 <Container component="main" maxWidth="xs">
   <UseSimpleBackdrop spinner ={openSpinner}/>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form}   >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={event => {
                const { value } = event.target;
                setUserLog(value);
              }}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> singIn()}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {message !== null?<UseAlertDialog message={message} onChange={handleClearMessage}/>: <div></div>}
    </Container>
        </div>
    )
}

export default UseSigIn