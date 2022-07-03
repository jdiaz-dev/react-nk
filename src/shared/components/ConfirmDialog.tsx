import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { DataConfirm } from '../types';

export function ConfirmDialog({
  dataConfirm,
  setDataConfirm,
}: {
  dataConfirm: DataConfirm;
  setDataConfirm: (dataConfirm: DataConfirm) => void;
}) {
  return (
    <Dialog
      open={dataConfirm.openDialog}
      onClose={() => setDataConfirm({ ...dataConfirm, openDialog: false })}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">¿Estás seguro de eliminar este ticket?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDataConfirm({ openDialog: false, resultConfirm: false })}>Cancelar</Button>
        <Button onClick={() => setDataConfirm({ openDialog: false, resultConfirm: true })}>Eliminar</Button>
      </DialogActions>
    </Dialog>
  );
}
