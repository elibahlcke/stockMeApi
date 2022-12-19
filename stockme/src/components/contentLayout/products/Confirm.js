import * as React from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Confirm({
  openDialog,
  handleClose,
  handleConfirm,
  title, 
  message,
  children,
  confirmText
}) {

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm" sx={{ m: 0}}>
        {title && <DialogTitle className='titles'>{title}</DialogTitle>}
        <DialogContent>
          {message && <DialogContentText>
            {message}
          </DialogContentText>}
          {children}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="secondary" variant="contained" sx={{ color: "#fff" }} onClick={handleConfirm}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Confirm.propTypes = {
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node.isRequired,
  confirmText: PropTypes.string
};
Confirm.defaultProps = {
  openDialog: false,
  handleClose: () => {},
  handleConfirm: () => {},
  title: "",
  message: "",
  confirmText: "Guardar"
}