import React, { RefObject, useContext, useRef, useState } from 'react';
import { Button } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useMutation } from 'react-apollo';
import { CREATE_TICKET } from '../../../out/TicketQueries';
import { CommandmentList } from '../shared/CommandmentList';
import './createTicket.scss';
import { TicketModel } from '../../../out/ticket.types';
import { useEffect } from 'react';
import { ReFetchTicketListContext } from '../../../../apocalipsex/in/ApocalipsexContainer';
import dayjs from 'dayjs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export function CreateTicket({ category }: { category: string }) {
  const reFetchTicketListContext = useContext(ReFetchTicketListContext);
  const classes = useStyles();
  const [displayButton, setDisplayButton] = useState(true);
  const [displayForm, setDisplayForm] = useState(false);
  const [isListShown, setIsListShown] = useState(false);
  const [ticket, setTicket] = useState<TicketModel>({
    content: '',
    ticketCategory: category,
    commandment: '',
    dateOffset: dayjs().utcOffset(),
  });
  const [createTicket, { data }] = useMutation(CREATE_TICKET);
  const refDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutsideHandler = (event: any) => {
      // !refDiv.current.contains : si no contiene es verdadero
      if (refDiv.current && !refDiv.current.contains(event.target) && !isListShown) {
        setDisplayForm(false);
        setDisplayButton(true);

        setIsListShown(false);
      }
    };

    document.addEventListener('click', clickOutsideHandler, true);
    return () => document.removeEventListener('click', clickOutsideHandler, true);
  }, [displayForm, isListShown]);

  const createTickeHandler = async () => {
    const res = await createTicket({
      variables: {
        input: {
          ...ticket,
        },
      },
    });
    if (res.data) reFetchTicketListContext.setReFetchTicketList(true);
  };

  return (
    <div ref={refDiv}>
      {displayButton && (
        <Button
          onClick={() => {
            setDisplayForm(!displayForm);
            setDisplayButton(!displayButton);
          }}
        >
          Create Ticket
        </Button>
      )}
      {displayForm && (
        <Card>
          <form className={classes.root} noValidate autoComplete="off">
            <div className="data-card-box">
              <TextField
                id="standard-basic"
                label={category}
                value={ticket.content}
                onChange={(e) => setTicket({ ...ticket, content: e.target.value })}
              />
              <CommandmentList ticket={ticket} setTicket={setTicket} setIsListShown={setIsListShown} />
            </div>

            <br />
            <Button type="button" onClick={createTickeHandler}>
              Guardar
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
