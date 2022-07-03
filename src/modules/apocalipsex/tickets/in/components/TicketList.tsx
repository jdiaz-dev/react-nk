import React, { useContext, useEffect, useState } from 'react';

import './styles.css';
import { Ticket } from './Ticket';
import { GET_TICKETS_GROUPED_BY_DAY } from '../../out/TicketQueries';
import { useQuery } from 'react-apollo';
import { GetTicketGroupedByDay, GetTicketGroupedByDayRequest, GetTicketGroupedByDayResponse, TicketModel } from '../../out/ticket.types';
import { CreateTicket } from './CreateTicket/CreateTicket';
import { CommandmentCategoriesContext, CreationTicketsContext } from './TicketsContainer';
import { createCustomDate } from '../../../../../shared/helpers/functions';

function TicketGroupedByCategory({ tickets }: { tickets: TicketModel[] }) {
  let ticketListRes;
  if (tickets) {
    ticketListRes = tickets.map(({ __typename, ...ticket }: TicketModel) => <Ticket key={ticket._id} ticket={ticket} />);
  }
  return <div>{ticketListRes}</div>;
}

export function TicketList() {
  const ticketCategoriesContext = useContext(CommandmentCategoriesContext);
  const creationTicketsContext = useContext(CreationTicketsContext);
  // const [tickets, setTickets] = useState<GetTicketGroupedByDay[]>([])
  const { data, loading } = useQuery<GetTicketGroupedByDayResponse, GetTicketGroupedByDayRequest>(
    GET_TICKETS_GROUPED_BY_DAY,
    {
      variables: {
        input: {
          startDate: createCustomDate(creationTicketsContext, 0),
          endDate: createCustomDate(creationTicketsContext, 23),
        },
      },
    },
  );
  if (loading) return <div>Loading</div>;

  let categoryGroupContainers;
  if (data && ticketCategoriesContext) {
    console.log('--------data2', data);
    const categories = ticketCategoriesContext.map((item) => item.name);

    const sortedTickets = data.getTicketsGroupedByDay.sort((a, b) => categories.indexOf(a._id) - categories.indexOf(b._id));
    // setTickets(sortedTickets)

    categoryGroupContainers = categories.map((item, index) => (
      <div className="ticketCategoryContainer">
        {!!sortedTickets[index] && (
          <TicketGroupedByCategory key={sortedTickets[index]._id} tickets={sortedTickets[index].tickets} />
        )}
        {<CreateTicket key={item} category={item} />}
      </div>
    ));
  }
  /* useEffect(() => {
      console.log('--------data1', data);
      
    }, [data]); */
  return <div className="tickets">{categoryGroupContainers}</div>;
}
