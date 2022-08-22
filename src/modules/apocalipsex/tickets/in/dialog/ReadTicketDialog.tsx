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
import { ReFetchTicketListContext } from '../../../apocalipsex/in/ApocalipsexContainer';

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

export function ReadTicketDialog({
    openReadDialog,
    setOpenReadDialog,
  ticket: _ticket,
}: {
    openReadDialog: boolean;
    setOpenReadDialog: (openReadDialog: boolean) => void;
  ticket: TicketModel;
}) {
  const [ticket, setTicket] = useState<TicketModel>({ ..._ticket });

 /*  const updateTicketHandler = async () => {
    setOpenReadDialog(false);
  }; */

  return (
    <Dialog
      open={openReadDialog}
      onClose={() => setOpenReadDialog(false)}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" onClose={setOpenReadDialog}>
        <div>
          {ticket.commandment}
        </div>
        <div>
          {ticket.ticketCategory}
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="dialog-description"></DialogContentText>
        {ticket.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenReadDialog(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
