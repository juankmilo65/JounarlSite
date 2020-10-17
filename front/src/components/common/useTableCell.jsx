import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';

export default function TableCellJournal(props) {
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
                        </div>
                        :<div></div>}
            </div>
    }
    </div>
  )
}