import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import UseAlertDialog from "./useAlertDialog";
import UseSimpleBackdrop from "./useSimpleBackdrop";
import UseTableCell from "./useTableCell";
// import { apiServices } from "../../configuration/constant";
import { updateUser } from "../Singin/reducer/action"
import { updateJournals } from "../Singin/reducer/action"
import { isUpdating } from "../Singin/reducer/action"
import axios from 'axios';
import { IState, ITable, IMouseEvent } from '../../interfaces';

const headers = ["Select", "File Name"];

export default function GenericTable(pops: ITable): JSX.Element {
  const { page, data } = pops;
  const dispatch = useDispatch();
  const user = useSelector((state: IState) => state.user);
  const [message, setMessage] = useState("");
  const [openSpinner, setOpenSpinner] = useState(false);

  useEffect(() => {

    if (!user.isUpdating) {
      dispatch(isUpdating(true));
      user.user.files.map((fileId: string) => (
        handleClick(null, fileId)
      ));
    }

    return () => {
      dispatch(isUpdating(false));
    };
  }, [])

  const isSelected = (name: string): boolean => user.filesSelected.indexOf(name) !== -1;

  const handleOk = () => {
    setMessage("");

  }

  const setRealtion = async (isSelected: boolean, idUser: string, idFile: string, newSelected: any, selectedIndexMoreThanCero: boolean | null, selectedIndex: number) => {
    setOpenSpinner(true);
    return await axios.post("/user/relateJournalToUser", {
      //  return await axios.post(apiServices+"/user/relateJournalToUser", {
      "idUser": idUser,
      "idJournal": idFile,
      "isSelected": isSelected
    }).then(res => {
      dispatch(updateUser(res.data.user))
      setOpenSpinner(false);
      setMessage(res.data.message);
      return isSelected ?
        newSelected.concat(user.filesSelected, idFile) :
        selectedIndexMoreThanCero && selectedIndex > 0 ?
          newSelected.concat(user.filesSelected.slice(0, selectedIndex), user.filesSelected.slice(selectedIndex + 1)) :
          selectedIndexMoreThanCero === null && selectedIndex === 0 ?
            newSelected.concat(user.filesSelected.slice(1)) :
            newSelected.concat(user.filesSelected.slice(0, -1));
    }).catch(() => {
      setOpenSpinner(false);
      setMessage("An error occurred with the selection of your Journal");
    });
  }

  const handleClick = async (event: IMouseEvent, idFile: string) => {
    const selectedIndex = user.filesSelected.indexOf(idFile);

    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      if (event === null) {
        newSelected = newSelected.concat(user.filesSelected, idFile);
      } else {
        newSelected = await setRealtion(true, user.user._id, idFile, newSelected, null, selectedIndex);
      }
    } else if (selectedIndex === 0) {
      newSelected = await setRealtion(false, user.user._id, idFile, newSelected, null, selectedIndex);
    } else if (selectedIndex === user.filesSelected.length - 1) {
      newSelected = await setRealtion(false, user.user._id, idFile, newSelected, true, selectedIndex);
    } else if (selectedIndex > 0) {
      newSelected = await setRealtion(false, user.user._id, idFile, newSelected, true, selectedIndex);
    }

    dispatch(updateJournals(newSelected));
  }

  return (
    <React.Fragment>
      <UseSimpleBackdrop isActive={openSpinner} />
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
          {/* {pops.data.map((row: { id: React.Key | null | undefined; filename: any; }, index: number) => { */}
          {data.map((row, index: number) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`
            return (
              <TableRow key={row.id}>
                <UseTableCell page={page} isItemSelected={isItemSelected} labelId={labelId} rowId={row.id} fileName={row.filename} onClick={handleClick} />
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      {message !== "" ? <UseAlertDialog message={message} onChange={handleOk} /> : <div></div>}
    </React.Fragment>
  );
}