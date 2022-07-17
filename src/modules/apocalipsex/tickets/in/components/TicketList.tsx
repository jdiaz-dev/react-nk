import React, { useContext, useEffect, useState } from 'react';

import './styles.css';
import { Ticket } from './Ticket';
import { GET_TICKETS_GROUPED_BY_DAY } from '../../out/TicketQueries';
import { useQuery } from 'react-apollo';
import {
  GetTicketGroupedByDay,
  GetTicketGroupedByDayRequest,
  GetTicketGroupedByDayResponse,
  TicketModel,
} from '../../out/ticket.types';
import { CreateTicket } from './CreateTicket/CreateTicket';
import { createCustomDate } from '../../../../../shared/helpers/functions';
import { CommandmentCategoriesContext, UpdateTicketListContext } from './TicketsContainer';
import { TicketCategoriesDetail } from '../../../ticket-categories/out/types';

function TicketGroupedByCategory({ tickets = [] }: { tickets: TicketModel[] }) {
  return (
    <>
      {tickets.map(({ __typename, ...ticket }: TicketModel) => (
        <Ticket key={ticket._id} ticket={ticket} />
      ))}
    </>
  );
}

export function TicketList({ selectedDate }: { selectedDate: Date | null }) {
  const ticketCategoriesContext = useContext(CommandmentCategoriesContext);
  const updateTicketListContext = useContext(UpdateTicketListContext);
  const [tickets, setTickets] = useState<GetTicketGroupedByDay[]>([]);
  const { loading, refetch } = useQuery<GetTicketGroupedByDayResponse, GetTicketGroupedByDayRequest>(
    GET_TICKETS_GROUPED_BY_DAY,
    {
      variables: {
        input: {
          startDate: createCustomDate(selectedDate, 0),
          endDate: createCustomDate(selectedDate, 23),
        },
      },
    },
  );

  useEffect(() => {
    if (updateTicketListContext.updateList) {
      refetch({
        input: {
          startDate: createCustomDate(selectedDate, 0),
          endDate: createCustomDate(selectedDate, 23),
        },
      }).then((res) => setTickets(res.data.getTicketsGroupedByDay));
      updateTicketListContext.setUpdateList(false);
    }
    return () => {
      setTickets([]);
    };
  }, [selectedDate, updateTicketListContext.updateList]);

  if (loading) return <div>loading...</div>;

  return (
    //fix: use fragments instead of div tag
    <div>
      <div className="tickets">
        {ticketCategoriesContext.map((ticketCategory, index) => (
          <React.Fragment key={index}>
            {tickets[index] && tickets[index]?._id == ticketCategory.name && (
              <div className="ticketCategoryContainer">
                <TicketGroupedByCategory tickets={tickets[index].tickets} />
                <CreateTicket category={ticketCategory.name} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );  
}
