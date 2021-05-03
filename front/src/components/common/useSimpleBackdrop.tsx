import React, { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { ISpiner } from '../../interfaces';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props: ISpiner): JSX.Element {
  const { isActive } = props;
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(isActive);
  }, [isActive])

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

