import React, { useContext, useEffect, useState } from 'react';

import './styles.scss';
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
import { CommandmentCategoriesContext, ReFetchTicketListContext } from '../../../apocalipsex/in/ApocalipsexContainer';
import { TicketCategoriesDetail } from '../../../ticket-categories/out/types';
import { ExtraTicketCategoryEnum } from '../../../../../shared/Consts';

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
  const reFetchTicketListContext = useContext(ReFetchTicketListContext);
  const [tickets, setTickets] = useState<GetTicketGroupedByDay[]>([]);

  const startDay = createCustomDate(selectedDate, 0, 0, 0);
  const endDay = createCustomDate(selectedDate, 23, 59, 59);
  const { loading, refetch } = useQuery<GetTicketGroupedByDayResponse, GetTicketGroupedByDayRequest>(
    GET_TICKETS_GROUPED_BY_DAY,
    {
      variables: {
        input: {
          startDate: startDay,
          endDate: endDay,
        },
      },
    },
  );

  useEffect(() => {
    if (reFetchTicketListContext.reFetchTicketList) {
      refetch({
        input: {
          startDate: startDay,
          endDate: endDay,
        },
      }).then((res) => {
        setTickets(res.data.getTicketsGroupedByDay)
      });
      reFetchTicketListContext.setReFetchTicketList(false);
    }
    return () => {
      setTickets([]);
    };
  }, [selectedDate, reFetchTicketListContext.reFetchTicketList]);

  if (loading) return <div>loading...</div>;

  return (
    //fix: use fragments instead of div tag
    <div>
      <div className="ticket-list">
        {ticketCategoriesContext.map((ticketCategory, index) => (
          <React.Fragment key={index}>
            {tickets[index] && tickets[index]?._id == ticketCategory.name && (
              <div className="ticketCategoryContainer">
                <TicketGroupedByCategory tickets={tickets[index].tickets} />
                {ticketCategory.name !== ExtraTicketCategoryEnum.TO_ENHANCE && (
                  <CreateTicket category={ticketCategory.name} />
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
