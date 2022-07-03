import React, { useContext, useState } from 'react';
  import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions,
    withStyles,
    createStyles,
    Theme,
    Typography,
    IconButton,
    TextField,
  } from '@material-ui/core';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { TicketModel } from '../../out/ticket.types';
import { WithStyles } from '@material-ui/styles';
import { CommandmentList } from '../components/shared/CommandmentList';
import { CategoryTicketList } from './CategoryTicketList';
import { useMutation } from 'react-apollo';
import { UDPDATE_TICKET } from '../../out/TicketQueries';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: (openUpdateDialog: boolean) => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={() => onClose(false)}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export function UpdateTicketDialog({
  openUpdateDialog,
  setOpenUpdateDialog,
  ticket: _ticket,
}: {
  openUpdateDialog: boolean;
  setOpenUpdateDialog: (openUpdateDialog: boolean) => void;
  ticket: TicketModel;
}) {
  const [ticket, setTicket] = useState<TicketModel>({ ..._ticket });
  const [updateTicketHandler] = useMutation(UDPDATE_TICKET);

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => setOpenUpdateDialog(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" onClose={setOpenUpdateDialog}>
        <div>
          {ticket.commandment}
          <CommandmentList ticket={ticket} setTicket={setTicket} />
        </div>
        <div>
          {ticket.ticketCategory}
          <CategoryTicketList ticket={ticket} setTicket={setTicket} />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="dialog-description"></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={ticket.content}
          onChange={(e) => setTicket({ ...ticket, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenUpdateDialog(false)}>Cancelar</Button>
        <Button
          onClick={() => {
            updateTicketHandler({
              variables: {
                input: {
                  ...ticket,
                },
              },
            });
            setOpenUpdateDialog(false);
          }}
        >
          Guardar cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
}
