import React, {useState} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

// Generate Order Data
function createData(id, name) {
  return {id, name };
}

const rows = [
  createData(1,"Test1"),
  createData(2,"Test2"),
  createData(3,"Test3"),
  createData(4,"Test4"),
];

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
  const classes = useStyles();
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [selected, setSelected] = useState([]);

  const isSelected = (name) => selected.indexOf(name) !== -1;

const handleClick = (event, id) => {
  const selectedIndex = selected.indexOf(id);

  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);
  }else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  }else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  }else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }

  setSelected(newSelected);
}

  return (
    <React.Fragment>
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
            <TableCell padding="checkbox">
              <Checkbox
              onClick={(event) => handleClick(event, row.id)}
              checked={isItemSelected}
              inputProps={{ 'aria-labelledby': labelId }}
              />
              </TableCell>
            <TableCell>{row.filename}</TableCell>
          </TableRow>
          )})}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}