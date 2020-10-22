import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UseAlertDialog from "../common/useAlertDialog";
import UseSimpleBackdrop from "../common/useSimpleBackdrop";
import UseTableCell from "../common/useTableCell";
import { apiServices } from "../../configuration/constant";
import { updateUser} from "../Singin/reducer/action"
import { updateJournals } from "../Singin/reducer/action"
import {isUpdating} from "../Singin/reducer/action"
import axios from 'axios';

const headers = [ "Select" ,"File Name" ];

export default function GenericTable(pops) {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user);
  const [message, setMessage] = useState(null);
  const [openSpinner, setOpenSpinner] = useState(false);

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

  const setRealtion = async (isSelected, idUser, id, newSelected, selectedIndexMoreThanCero, selectedIndex) =>
  {
  setOpenSpinner(true);
   return await axios.post(apiServices+"/user/relateJournalToUser", {
      "idUser": idUser,
      "idJournal": id,
      "isSelected": isSelected
  }).then(res => {
    dispatch(updateUser(res.data.user))
    setOpenSpinner(false);
    setMessage(res.data.message);
    return isSelected ? 
    newSelected.concat(user.journalsSelected, id) :
    selectedIndexMoreThanCero && selectedIndex > 0 ?
    newSelected.concat(user.journalsSelected.slice(0, selectedIndex),user.journalsSelected.slice(selectedIndex + 1)):
    selectedIndexMoreThanCero === null && selectedIndex === 0 ?
    newSelected.concat(user.journalsSelected.slice(1)) :
    newSelected.concat(user.journalsSelected.slice(0, -1));
  }).catch(() => {
    setOpenSpinner(false);
      setMessage("An error occurred with the selection of your Journal");
  });
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
    newSelected = await setRealtion(true, user.user._id, id, newSelected);
  }
  }else if (selectedIndex === 0) {
    newSelected = await setRealtion(false, user.user._id, id, newSelected, null, selectedIndex);
  }else if (selectedIndex === user.journalsSelected.length - 1) {
    newSelected = await setRealtion(false, user.user._id, id, newSelected, true, selectedIndex);
  }else if (selectedIndex > 0) {
    newSelected = await setRealtion(false, user.user._id, id, newSelected, true, selectedIndex);
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