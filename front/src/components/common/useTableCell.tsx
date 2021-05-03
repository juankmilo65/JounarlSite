import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import UseAlertDialog from "./useAlertDialog";
import { IMouseEvent, ITableCell, IFile } from '../../interfaces';
// import { apiServices } from "../../configuration/constant";


export default function TableCellJournal(props: ITableCell) {
  const { onClick, page, rowId, isItemSelected, labelId, fileName } = props;
  const [openModal, setOpenModal] = useState(false);
  const [file, setFile] = useState<IFile>();

  const openModalHandler = async (idFile: string) => {
    // setFile(apiServices + "/file/" + idFile);

    //todo  fix this call with new redux implementation
    // setFile("/file/" + idFile);
    setOpenModal(true);
  }
  const handleClose = () => {
    setOpenModal(false);
  };

  const handleClick = (event: IMouseEvent, rowId: string) => {
    onClick(event, rowId);
  }
  return (
    <div>
      { page === "index" ?
        <div>
          <TableCell padding="checkbox">
            <Checkbox
              onClick={(event) => handleClick(event, rowId)}
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </TableCell>
          <TableCell>{fileName}</TableCell>
        </div> :
        <div>
          {isItemSelected ?
            <div>
              <TableCell padding="checkbox">
                <Checkbox
                  disabled={true}
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell>{fileName}</TableCell>
              <TableCell>
                <Link href="#" variant="body2" onClick={() => openModalHandler(props.rowId)} >
                  View
              </Link>
              </TableCell>
              {openModal ? <UseAlertDialog message={"PDF"} onChange={handleClose} file={file} /> : <div></div>}
            </div>
            : <div></div>}
        </div>
      }
    </div>
  )
}