import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TicketModel } from '../../out/ticket.types';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CardActions,
} from '@material-ui/core';
import { useState } from 'react';
import { UpdateTicketDialog } from '../dialog/UpdateTicketDialog';
import { useMutation } from 'react-apollo';
import { DELETE_TICKET } from '../../out/TicketQueries';
import { ConfirmDialog } from '../../../../../shared/components/ConfirmDialog';
import { DataConfirm } from '../../../../../shared/types';

export function Ticket({ ticket }: { ticket: TicketModel }) {
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<DataConfirm>({ openDialog: false, resultConfirm: false });
  const [deleteTicketHandler] = useMutation(DELETE_TICKET);

  if (ticket) console.log('------------ticket', ticket);
  useEffect(() => {
    if (openConfirmDialog.resultConfirm) {
      deleteTicketHandler({
        variables: {
          input: {
            _id: ticket._id,
          },
        },
      });
      setOpenConfirmDialog({ ...openConfirmDialog, openDialog: false });
    }
  }, [openConfirmDialog.resultConfirm]);

  return (
    <>
      <Card style={{ padding: '10px', backgroundColor: 'pink', margin: '5px' }}>
        <CardContent onClick={() => setOpenUpdateDialog(true)} style={{ backgroundColor: 'red', margin: '5px' }}>
          <Typography color="textSecondary">{ticket.ticketCategory}</Typography>
          <Typography color="textSecondary">{ticket.commandment}</Typography>
          <Typography variant="h5" component="p">
            {ticket.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={() => {
              setOpenConfirmDialog({ ...openConfirmDialog, openDialog: true });
            }}
            size="small"
          >
            Eliminar ticket
          </Button>
          <ConfirmDialog dataConfirm={openConfirmDialog} setDataConfirm={setOpenConfirmDialog} />
        </CardActions>
      </Card>
      <UpdateTicketDialog openUpdateDialog={openUpdateDialog} setOpenUpdateDialog={setOpenUpdateDialog} ticket={ticket} />
    </>
  );
}
