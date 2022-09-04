import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
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
import { WithStyles } from '@material-ui/styles';
import { useMutation } from 'react-apollo';
import { InteractionsModel } from '../out/interaction.types';
import { CREATE_INTERACTIONS, UPDATE_INTERACTIONS } from '../out/InteractionQueries';
import { ReFetchInteractionsContext } from '../../apocalipsex/in/ApocalipsexContainer';

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

function UpdateInteractionsByDayDialog({
  openUpdateDialog,
  setOpenUpdateDialog,
  interactionsss: _interactions,
}: {
  openUpdateDialog: boolean;
  setOpenUpdateDialog: (openUpdateDialog: boolean) => void;
  interactionsss: InteractionsModel;
}) {
  const reFetchInteractionsContext = useContext(ReFetchInteractionsContext);
  const [interactions, setInteractions] = useState<InteractionsModel>(_interactions);
  const [createInteractions] = useMutation(CREATE_INTERACTIONS);
  const [updateInteractions] = useMutation(UPDATE_INTERACTIONS);

  useEffect(() => {
    setInteractions(_interactions);
  }, [_interactions]);

  const createOrUpdateInteracionsHandler = async () => {
    const input = {
      ...interactions,
    };
    try {
      if (_interactions._id) {
        await updateInteractions({
          variables: {
            input,
          },
        });
      } else {
        await createInteractions({
          variables: {
            input,
          },
        });
      }
    } catch (error) {
      console.log('------error', error);
    }
    setOpenUpdateDialog(false);
    reFetchInteractionsContext.setReFetchInteractions(true);
  };

  return (
    <Dialog
      open={openUpdateDialog}
      onClose={() => setOpenUpdateDialog(false)}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title" onClose={setOpenUpdateDialog}>
        Interacciones de hoy
      </DialogTitle>
      <DialogContent dividers>
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="hombres"
            variant="outlined"
            style={{ margin: '3px' }}
            value={interactions.totalMen}
            onChange={(e) => setInteractions({ ...interactions, totalMen: parseInt(e.target.value) })}
          />
          <TextField
            id="filled-basic"
            label="mujeres"
            variant="outlined"
            style={{ margin: '3px' }}
            value={interactions.totalWomen}
            onChange={(e) => setInteractions({ ...interactions, totalWomen: parseInt(e.target.value) })}
          />
          <TextField
            id="outlined-basic"
            label="grupales"
            variant="outlined"
            style={{ margin: '3px' }}
            value={interactions.totalGroups}
            onChange={(e) => setInteractions({ ...interactions, totalGroups: parseInt(e.target.value) })}
          />
        </form>

        {/* <DialogContentText id="dialog-description"></DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
          value={ticket.content}
          onChange={(e) => setInteractions({ ...ticket, content: e.target.value })}
        /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenUpdateDialog(false)}>Cancelar</Button>
        <Button onClick={createOrUpdateInteracionsHandler}>Guardar cambios</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateInteractionsByDayDialog;
