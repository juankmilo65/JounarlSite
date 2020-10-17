import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import  UseGenericTable  from "../common/useGenericTable";
import UseCopyright from "../common/useCopyright";
import  UseAppBar  from "../common/useAppBar";
import { apiServices } from "../../configuration/constant";
import UseSimpleBackdrop from "../common/useSimpleBackdrop";
import UseAlertDialog from "../common/useAlertDialog";
import axios, { post } from 'axios';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  toolbar: {
    flexWrap: 'wrap',
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
  const user = useSelector(state=> state.user);
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [openSpinner, setOpenSpinner] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect( ()=>{
    getFiles();
  }, [])

  const getFiles = async function ()
  {
    const journalResponse = await axios.get(apiServices+"/file/allFiles/pdf");
    setFileList(journalResponse.data);
  }

  const renderRedirect = () => {
      history.push('/');
}

const handleOk = () =>
{
    setMessage(null);   
}

const fileChanged = async (event) =>{
    let data = new FormData();
    data.append('file', event.target.files[0]);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    post(apiServices+"/file", data, config)
    .then(res => {
        setOpenSpinner(false);
        getFiles();
        setMessage("Journal successfully added.");
    }).catch(error => {
        setMessage("Error uploading file");
    });

    console.log(data);
  }


  return (
    <div>
    { user.user.name === undefined ?
    <div>{renderRedirect()}</div> :
    <React.Fragment>
        <UseSimpleBackdrop spinner ={openSpinner}/>
      <CssBaseline />
      <UseAppBar/>
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Journals
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
         Here you can find the last populars Journals.
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
         Select the Journals of your preference 
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
          <UseGenericTable data={fileList}/>
          <Button variant="contained" component="label"> 
          Upload File
          <input type="file" style={{ display: "none" }} accept="application/pdf" onChange={(e)=>fileChanged(e)} />
          </Button>
      </Container>
      {/* Footer */}
      <Container maxWidth="md" component="footer" className={classes.footer}>
        <Box mt={5}>
          <UseCopyright />
        </Box>
      </Container>
      {/* End footer */}
      {message !== null?<UseAlertDialog message={message} onChange={handleOk}/>: <div></div>}
    {/* </React.Fragment> */}
    </React.Fragment> 
}
</div>
  );
}