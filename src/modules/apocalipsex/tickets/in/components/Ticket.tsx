import React, { useContext, useEffect } from 'react';
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
import { ReFetchTicketListContext } from '../../../apocalipsex/in/ApocalipsexContainer';
import { ExtraTicketCategoryEnum } from '../../../../../shared/Consts';
import { ReadTicketDialog } from '../dialog/ReadTicketDialog';

export function Ticket({ ticket }: { ticket: TicketModel }) {
  const reFetchTicketListContext = useContext(ReFetchTicketListContext);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openReadDialog, setOpenReadDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<DataConfirm>({ openDialog: false, resultConfirm: false });
  const [deleteTicket] = useMutation(DELETE_TICKET);
  useEffect(() => {
    const deleteTicketHandler = async () => {
      if (openConfirmDialog.resultConfirm) {
        const res = await deleteTicket({
          variables: {
            input: {
              _id: ticket._id,
            },
          },
        });
        setOpenConfirmDialog({ ...openConfirmDialog, openDialog: false });
        if (res.data) reFetchTicketListContext.setReFetchTicketList(true);
      }
    };
    deleteTicketHandler();
  }, [openConfirmDialog.resultConfirm]);

  return (
    <>
      <Card style={{ padding: '10px', marginBottom: '3%' }} variant="outlined">
        <CardContent
          onClick={
            ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE
              ? () => setOpenUpdateDialog(true)
              : () => setOpenReadDialog(true)
          }
          style={{ backgroundColor: 'red', margin: '5px' }}
        >
          <Typography color="textSecondary">{ticket.ticketCategory}</Typography>
          <Typography color="textSecondary">{ticket.commandment}</Typography>
          <Typography variant="h5" component="p">
            {ticket.content}
          </Typography>
        </CardContent>
        <CardActions>
          {ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE && (
            <Button
              onClick={() => {
                setOpenConfirmDialog({ ...openConfirmDialog, openDialog: true });
              }}
              size="small"
            >
              Eliminar ticket
            </Button>
          )}
          <ConfirmDialog dataConfirm={openConfirmDialog} setDataConfirm={setOpenConfirmDialog} />
        </CardActions>
      </Card>
      {ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE && (
        <UpdateTicketDialog openUpdateDialog={openUpdateDialog} setOpenUpdateDialog={setOpenUpdateDialog} ticket={ticket} />
      )}
      {<ReadTicketDialog openReadDialog={openReadDialog} setOpenReadDialog={setOpenReadDialog} ticket={ticket} />}
    </>
  );
}
