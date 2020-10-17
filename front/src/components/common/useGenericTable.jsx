import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UseAlertDialog from "../common/useAlertDialog";
import UseSimpleBackdrop from "../common/useSimpleBackdrop";
import UseTableCell from "../common/useTableCell";
import Button from '@material-ui/core/Button';
import { apiServices } from "../../configuration/constant";
import { updateUser} from "../Singin/reducer/action"
import { updateJournals } from "../Singin/reducer/action"
import {isUpdating} from "../Singin/reducer/action"
import axios from 'axios';

// Generate Order Data
function createData(id, name) {
  return {id, name };
}


const headers = [ "Select" ,"File Name" ];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  title: {
    flex: '1 1 100%',
  },
}));

export default function GenericTable(pops) {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state=> state.user);
  const [message, setMessage] = useState(null);
  const [openSpinner, setOpenSpinner] = useState(false);
  const [redirect, setRedirect] = useState(false);

useEffect(()=>{

  if(!user.isUpdating)
  {
  dispatch(isUpdating(true));
  user.user.files.map(file=>(  
    handleClick(null, file)
  ));
  }

  return () => {
    dispatch(isUpdating(false));
  };
},[])

  const isSelected = (name) => user.journalsSelected.indexOf(name) !== -1;
  
  const handleOk = () =>
  {
      setMessage(null);
      
  }

const handleClick = async (event, id) => {
  const selectedIndex = user.journalsSelected.indexOf(id);

  let newSelected = [];

  if (selectedIndex === -1) {
  if(event === null)
  {
    newSelected = newSelected.concat(user.journalsSelected, id);
  }else
  {
    setOpenSpinner(true)
    console.log(apiServices)
      await axios.post(apiServices+"/user/relateJournalToUser", {
        "idUser": user.user._id,
        "idJournal": id
    }).then(res => {
      dispatch(updateUser(res.data.user))
      setOpenSpinner(false);
      setMessage(res.data.message);
      newSelected = newSelected.concat(user.journalsSelected, id);
    }).catch(() => {
      setOpenSpinner(false);
        setMessage("An error occurred with the selection of your Journal");
    });
  }
  }else if (selectedIndex === 0) {
      newSelected = newSelected.concat(user.journalsSelected.slice(1));  
  }else if (selectedIndex === user.journalsSelected.length - 1) {
    newSelected = newSelected.concat(user.journalsSelected.slice(0, -1));
  }else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      user.journalsSelected.slice(0, selectedIndex),
      user.journalsSelected.slice(selectedIndex + 1),
    );
  }
 
  dispatch(updateJournals(newSelected));
}

  return (
    <React.Fragment>
      <UseSimpleBackdrop spinner ={openSpinner}/>
      <Table size="small">
        <TableHead>
          <TableRow>
              {
                headers.map(header => (
                <TableCell>{header}</TableCell>
                ))  
              }
            
          </TableRow>
        </TableHead>
        <TableBody>
          {pops.data.map((row, index) =>{ 
            const isItemSelected = isSelected(row.id);
 const labelId = `enhanced-table-checkbox-${index}`
 return (
 <TableRow key={row.id}>
   <UseTableCell page={pops.page} isItemSelected={isItemSelected} labelId={labelId} rowId ={row.id} fileName={row.filename} onClick={handleClick}/>
   </TableRow>
          )})}
        </TableBody>
      </Table>
      {message !== null?<UseAlertDialog message={message} onChange={handleOk}/>: <div></div>}
    </React.Fragment>
  );
}