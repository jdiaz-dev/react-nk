import React, { createContext, useState } from 'react';
import TicketCategories from '../../../ticket-categories/in/TicketCategories';
import { TicketList } from './TicketList';
import { useQuery } from 'react-apollo';
import { CommandmentDetail, GetCommandmentsResponse } from '../../../commandments/adapters/out/commandments.types';
import { GET_COMMANDMENTS } from '../../../commandments/adapters/out/CommandmentsQueries';
import { TicketCategoriesDetail, TicketCategoriesResponse } from '../../../ticket-categories/out/types';
import { GET_TICKET_CATEGORIES } from '../../../ticket-categories/out/TicketCategoriesQueries';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export const CommandmentsContext = createContext<CommandmentDetail[] | null>(null);
export const CommandmentCategoriesContext = createContext<TicketCategoriesDetail[]>([]);
export const CreationTicketsContext = createContext<Date|null>(new Date());

function TicketsContainer() {
  // we open and closing dialog using state variable
  const { data: commandments } = useQuery<GetCommandmentsResponse>(GET_COMMANDMENTS);
  const { data: ticketCategories } = useQuery<TicketCategoriesResponse>(GET_TICKET_CATEGORIES);

  const [selectedDate, setSelectedDate] = useState<Date|null>(new Date());

  if (selectedDate) console.log('-----selectedDate', selectedDate);

  const handleDateChange = (date: Date| null) => {
    setSelectedDate(date);
  };

  return (
    <>
      {!!commandments && !!ticketCategories && (
        <CommandmentsContext.Provider value={commandments.getCommandments}>
          <CommandmentCategoriesContext.Provider value={ticketCategories.getTicketCategories}>
            <CreationTicketsContext.Provider value={selectedDate}>
              <div>TicketsContainer</div>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container justifyContent="space-around">
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="Date picker inline"
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <TicketCategories />
                <TicketList />
              </div>
            </CreationTicketsContext.Provider>
          </CommandmentCategoriesContext.Provider>
        </CommandmentsContext.Provider>
      )}
    </>
  );
}

export default TicketsContainer;
