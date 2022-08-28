import React, { useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TicketModel } from '../../out/ticket.types';
import { Button, CardActions } from '@material-ui/core';
import { useState } from 'react';
import { UpdateTicketDialog } from '../dialog/UpdateTicketDialog';
import { useMutation } from 'react-apollo';
import { DELETE_TICKET, UPDATE_TICKET_TO_ACHIVED } from '../../out/TicketQueries';
import { ConfirmDialog } from '../../../../../shared/components/ConfirmDialog';
import { DataConfirm } from '../../../../../shared/types';
import { ReFetchTicketListContext } from '../../../apocalipsex/in/ApocalipsexContainer';
import {
  ActionsConfirmDialogEnum,
  ExtraTicketCategoryEnum,
  MessagesConfirmEnum,
  TicketCategoriesEnum,
} from '../../../../../shared/Consts';
import { ReadTicketDialog } from '../dialog/ReadTicketDialog';

export function Ticket({ ticket }: { ticket: TicketModel }) {
  const reFetchTicketListContext = useContext(ReFetchTicketListContext);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openReadDialog, setOpenReadDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState<DataConfirm>({
    openDialog: false,
    resultConfirm: false,
    action: '',
    message:
      ticket.ticketCategory === TicketCategoriesEnum.TO_ENHANCE
        ? MessagesConfirmEnum.MARK_TICKET_TO_ACHIEVED
        : MessagesConfirmEnum.REMOVE_TICKET,
  });

  const [deleteTicket] = useMutation(DELETE_TICKET);
  const [updateTicketToAchieved] = useMutation(UPDATE_TICKET_TO_ACHIVED);

  useEffect(() => {
    const deleteTicketHandler = async () => {
      const res = await deleteTicket({
        variables: {
          input: {
            _id: ticket._id,
          },
        },
      });
      setOpenConfirmDialog({ ...openConfirmDialog, openDialog: false });
      if (res.data) reFetchTicketListContext.setReFetchTicketList(true);
    };

    const markTicketToAchieved = async () => {
      const res = await updateTicketToAchieved({
        variables: {
          input: {
            _id: ticket._id,
          },
        },
      });
      setOpenConfirmDialog({ ...openConfirmDialog, openDialog: false });
      if (res.data) reFetchTicketListContext.setReFetchTicketList(true);
    };

    if (openConfirmDialog.resultConfirm && openConfirmDialog.action === ActionsConfirmDialogEnum.REMOVE_TICKET) {
      void deleteTicketHandler();
    } else if (
      openConfirmDialog.resultConfirm &&
      openConfirmDialog.action === ActionsConfirmDialogEnum.MARK_TICKET_TO_ACHIEVED
    ) {
      void markTicketToAchieved();
    }
  }, [openConfirmDialog.resultConfirm]);

  return (
    <>
      <Card style={{ padding: '4px', marginBottom: '3%', maxHeight: '180px' }} variant="outlined">
        <CardContent
          onClick={
            ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE
              ? () => setOpenUpdateDialog(true)
              : () => setOpenReadDialog(true)
          }
          style={{ backgroundColor: 'red', borderRadius: '4px', padding: '4px' }}
        >
          <Typography color="textSecondary">{ticket.commandment}</Typography>
          <Typography style={{ maxHeight: '100px', overflow: 'hidden' }} variant="body2" component="p">
            {ticket.content}
          </Typography>
        </CardContent>
        <CardActions>
          {(() => {
            if (ticket.achieved === true) {
              return <div>Logrado</div>;
            } else if (ticket.ticketCategory === ExtraTicketCategoryEnum.TO_ENHANCE && ticket.achieved == null) {
              return (
                <Button
                  onClick={() => {
                    setOpenConfirmDialog({ ...openConfirmDialog, openDialog: true });
                  }}
                  size="small"
                >
                  Marcar como logrado
                </Button>
              );
            }
          })()}

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
