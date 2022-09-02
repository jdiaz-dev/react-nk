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
import { makeStyles } from '@material-ui/core/styles';
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

const dialogStyles = makeStyles({
  title: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '85%',
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
    <MuiDialogTitle disableTypography className={`${classes.root} `} {...other}>
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ticket: { resultTicket, ..._ticket },
}: {
  openUpdateDialog: boolean;
  setOpenUpdateDialog: (openUpdateDialog: boolean) => void;
  ticket: TicketModel;
}) {
  const classes = dialogStyles();

  const reFetchTicketListContext = useContext(ReFetchTicketListContext);
  const [ticket, setTicket] = useState<TicketModel>({ ..._ticket });
  const [updateTicket] = useMutation(UDPDATE_TICKET);

  const updateTicketHandler = async () => {
    try {
      const res = await updateTicket({
        variables: {
          input: {
            ...ticket,
          },
        },
      });
      setOpenUpdateDialog(false);
      if (res.data) reFetchTicketListContext.setReFetchTicketList(true);
    } catch (error) {
      console.log('---------error', error);
    }
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => setOpenUpdateDialog(false)}
      fullWidth={true}
      maxWidth="sm"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" onClose={setOpenUpdateDialog}>
        <div className={classes.title}>
          <CommandmentList ticket={ticket} setTicket={setTicket} />
          <CategoryTicketList ticket={ticket} setTicket={setTicket} />
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText id="dialog-description"></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="content"
          label="Contenido"
          type="text"
          fullWidth
          multiline
          value={ticket.content}
          onChange={(e) => setTicket({ ...ticket, content: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenUpdateDialog(false)}>Cancelar</Button>
        <Button onClick={updateTicketHandler}>Guardar cambios</Button>
      </DialogActions>
    </Dialog>
  );
}
