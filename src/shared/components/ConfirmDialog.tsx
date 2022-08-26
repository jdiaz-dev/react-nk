import React from 'react';
import { Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { DataConfirm } from '../types';
import { ActionsConfirmDialogEnum, MessagesConfirmEnum } from '../Consts';

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
        <DialogContentText id="alert-dialog-slide-description">{dataConfirm.message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setDataConfirm({ openDialog: false, resultConfirm: false, action: '' })}>Cancelar</Button>

        {dataConfirm.message === MessagesConfirmEnum.REMOVE_TICKET && (
          <Button
            onClick={() =>
              setDataConfirm({ openDialog: false, resultConfirm: true, action: ActionsConfirmDialogEnum.REMOVE_TICKET })
            }
          >
            Eliminar
          </Button>
        )}

        {dataConfirm.message === MessagesConfirmEnum.MARK_TICKET_TO_ACHIEVED && (
          <Button
            onClick={() =>
              setDataConfirm({
                openDialog: false,
                resultConfirm: true,
                action: ActionsConfirmDialogEnum.MARK_TICKET_TO_ACHIEVED,
              })
            }
          >
            Marcar como logrado
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
