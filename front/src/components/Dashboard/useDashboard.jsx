import React, {useState, useEffect} from 'react';
import { useSelector } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import  UseGenericTable  from "../common/useGenericTable";
import UseCopyright from "../common/useCopyright";
import { apiServices } from "../../configuration/constant";
import axios from 'axios';

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
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const [fileList, setFileList] = useState([]);
  const user = useSelector(state=> state.user);

  useEffect( ()=>{
    getFiles();
  }, [])

  const getFiles = async function ()
  {
    const journalResponse = await axios.get(apiServices+"/file/allFiles/pdf");
    setFileList(journalResponse.data);
  }

  return (
    <React.Fragment>
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
          <Button href="#" color="primary" variant="outlined" className={classes.link}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Journals
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
         Here you can find the last populars Journals.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
          <UseGenericTable data={fileList}/>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <UseCopyright />
        </Box>
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}