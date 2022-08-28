import React from 'react';
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
import { makeStyles } from '@material-ui/core/styles';

import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { TicketModel } from '../../out/ticket.types';
import { WithStyles } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';

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

const chipStyles = makeStyles({
  containerChip: {},
  chip: {
    width: '43%',
    borderRadius: '5px',
    backgroundColor: 'red',
    margin: '2%',
    fontSize: '16px'
  },
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
  const chipClass = chipStyles();
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
          <Chip className={chipClass.chip} label={`Mandamiento: ${_ticket.commandment}`} />
          <Chip className={chipClass.chip} label={`Estado del ticket: ${_ticket.ticketCategory}`} />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="dialog-description"></DialogContentText>
        {_ticket.content}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenReadDialog(false)}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
