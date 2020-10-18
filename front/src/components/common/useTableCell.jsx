import React, {useState} from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import UseAlertDialog from "./useAlertDialog";


export default function TableCellJournal(props) {
const [openModal, setOpenModal] = useState(false);

const openModalHandler = ()=>{
  setOpenModal(true);
}
const handleClose = () => {
  setOpenModal(false);
};


    const handleClick = (event,rowId ) => {
        props.onClick(event,rowId)
    }
  return (
    <div>
    { props.page === "index" ?
    <div>
            <TableCell padding="checkbox">
              <Checkbox
              onClick={(event) => handleClick(event, props.rowId)}
              checked={props.isItemSelected}
              inputProps={{ 'aria-labelledby': props.labelId }}
              />
              </TableCell>
            <TableCell>{props.fileName}</TableCell>
            </div>:
            <div>
                { props.isItemSelected ? 
                <div>
                    <TableCell padding="checkbox">
                        <Checkbox
                        disabled ={true}  
                        checked={props.isItemSelected}
                        inputProps={{ 'aria-labelledby': props.labelId }}
                        />
                        </TableCell>
                        <TableCell>{props.fileName}</TableCell>
                        <TableCell>
                        <Link href="#" variant="body2" onClick={()=> openModalHandler()} >
                View
              </Link>
                        </TableCell>
                        {openModal ?<UseAlertDialog message={"PDF"} onChange={handleClose}/>: <div></div>}  
                       
                        </div>
                        :<div></div>}
            </div>
    }
    </div>
  )
}