import React , {useState, useEffect}from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import file from "./CV Juan Camilo Morales - English.pdf";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;



const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if(props.message !== null )
    {
      setText(props.message);
      setOpen(true);   
    }
}, [props.message])

   const handleClose = () => {
    setText("");
    props.onChange();
    setOpen(false);
  };

  const onDocumentLoadSuccess=( numPages ) => {
    setNumPages(numPages);
  }
  const goToPrevPage = () =>
  {
    setPageNumber(pageNumber - 1)
  }
  
const goToNextPage = () =>
{
  setPageNumber(pageNumber + 1)
}
  

  return (
    <div>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Alert"}</DialogTitle>
        <DialogContent>
        {props.message === "PDF"?
         <DialogContentText id="alert-dialog-description">
        <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        <Page pageNumber={pageNumber} />
      </Document>
     
      <nav>
          <button onClick={goToPrevPage}>Prev</button>
          <button onClick={goToNextPage}>Next</button>
        </nav>
      </DialogContentText>: 
          <DialogContentText id="alert-dialog-description">
              {text}
          </DialogContentText>
           }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
     
    </div>
  );
}
