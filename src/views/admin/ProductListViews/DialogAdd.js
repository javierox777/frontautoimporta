import React, { useState } from 'react';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
import { MButton } from 'src/theme';
import FormAdd from './FormAdd';

// ----------------------------------------------------------------------

function FormDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MButton variant="contained" color="primary" onClick={handleClickOpen}>
        Agregar nuevo vehiculo
      </MButton>

      <Dialog open={open} maxWidth="md" onClose={handleClose}>
        <DialogTitle>Crear vehiculo</DialogTitle>
        <DialogContent>
          <FormAdd handleCloseCallback={handleClose}  />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default FormDialogs;
