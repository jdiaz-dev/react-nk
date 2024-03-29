import React, { useContext, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { TicketModel, UpdateTicketToAchievedMutation, UpdateTicketToAchievedRequest } from '../../out/ticket.types';
import { Button, CardActions } from '@material-ui/core';
import { useState } from 'react';
import { UpdateTicketDialog } from '../dialog/UpdateTicketDialog';
import { useMutation } from 'react-apollo';
import { DELETE_TICKET, UPDATE_TICKET_TO_ACHIVED } from '../../out/TicketQueries';
import { ConfirmDialog } from '../../../../../shared/components/ConfirmDialog';
import { DataConfirm } from '../../../../../shared/types';
import { ReFetchTicketListContext } from '../../../apocalipsex/in/ApocalipsexContainer';
import { makeStyles } from '@material-ui/core/styles';

import {
  ActionsConfirmDialogEnum,
  ExtraTicketCategoryEnum,
  MessagesConfirmEnum,
  TicketCategoriesEnum,
} from '../../../../../shared/Consts';
import { ReadTicketDialog } from '../dialog/ReadTicketDialog';

const useStyles = makeStyles({
  root: {
    // backgroundColor: '#333333',
    width: '98%',
    margin: '0 auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export function Ticket({ ticket }: { ticket: TicketModel }) {
  const classes = useStyles();

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
  const [achieved, setAchieved] = useState(false);

  const [deleteTicket] = useMutation(DELETE_TICKET);
  const [updateTicketToAchieved] = useMutation<UpdateTicketToAchievedMutation, UpdateTicketToAchievedRequest>(
    UPDATE_TICKET_TO_ACHIVED,
  );

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
            _id: ticket._id ? ticket._id : '',
            achieved,
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
      <Card
        className={classes.root}
        style={{ padding: '4px', marginBottom: '4%', maxHeight: '180px' }}
        elevation={4}
        // variant="outlined"
      >
        <CardContent
          onClick={
            ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE
              ? () => setOpenUpdateDialog(true)
              : () => setOpenReadDialog(true)
          }
          style={{
            backgroundColor: ticket.ticketCategory == ExtraTicketCategoryEnum.TO_ENHANCE ? '#606060' : '#dbbd29',
            color: ticket.ticketCategory == ExtraTicketCategoryEnum.TO_ENHANCE ? 'wheat' : '#282306',
            borderRadius: '4px',
            padding: '4px',
            cursor: 'pointer',
          }}
        >
          <Typography color="textSecondary">{ticket.commandment}</Typography>
          <Typography style={{ maxHeight: '150px', overflow: 'hidden' }} variant="body2" component="p">
            {ticket.content}
          </Typography>
        </CardContent>
        <CardActions style={{ padding: 0 }}>
          {(() => {
            if (ticket.resultTicket && ticket.resultTicket.achieved === true) {
              return <div>Logrado</div>;
            } else if (
              ticket.ticketCategory === ExtraTicketCategoryEnum.TO_ENHANCE &&
              ticket.resultTicket &&
              ticket.resultTicket.achieved == false &&
              ticket.resultTicket.marked == false
            ) {
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
              Eliminar
            </Button>
          )}
          <ConfirmDialog dataConfirm={openConfirmDialog} setDataConfirm={setOpenConfirmDialog} setAchieved={setAchieved} />
        </CardActions>
      </Card>
      {ticket.ticketCategory !== ExtraTicketCategoryEnum.TO_ENHANCE && (
        <UpdateTicketDialog openUpdateDialog={openUpdateDialog} setOpenUpdateDialog={setOpenUpdateDialog} ticket={ticket} />
      )}
      {<ReadTicketDialog openReadDialog={openReadDialog} setOpenReadDialog={setOpenReadDialog} ticket={ticket} />}
    </>
  );
}
