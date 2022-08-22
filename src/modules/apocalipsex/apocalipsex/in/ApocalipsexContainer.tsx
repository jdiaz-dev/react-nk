import React, { createContext, useState } from 'react';
import { TicketCategories } from '../../ticket-categories/in/TicketCategories';
import { TicketList } from '../../tickets/in/components/TicketList';
import { useQuery } from 'react-apollo';
import { CommandmentDetail, GetCommandmentsResponse } from '../../commandments/adapters/out/commandments.types';
import { GET_COMMANDMENTS } from '../../commandments/adapters/out/CommandmentsQueries';
import { TicketCategoriesDetail, TicketCategoriesResponse } from '../../ticket-categories/out/types';
import { GET_TICKET_CATEGORIES } from '../../ticket-categories/out/TicketCategoriesQueries';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { InteractionsByDay } from '../../interactions/in/InteractionsByDay';

export const CommandmentsContext = createContext<CommandmentDetail[] | null>(null);
export const CommandmentCategoriesContext = createContext<TicketCategoriesDetail[]>([]);
export const ReFetchTicketListContext = createContext<{
  reFetchTicketList: boolean;
  setReFetchTicketList: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reFetchTicketList: true, setReFetchTicketList: useState });
export const ReFetchInteractionsContext = createContext<{
  reFetchInteractions: boolean;
  setReFetchInteractions: React.Dispatch<React.SetStateAction<boolean>>;
}>({ reFetchInteractions: true, setReFetchInteractions: useState });

export function ApocalipsexContainer() {
  // we open and closing dialog using state variable
  const { data: commandments } = useQuery<GetCommandmentsResponse>(GET_COMMANDMENTS);
  const { data: ticketCategories } = useQuery<TicketCategoriesResponse>(GET_TICKET_CATEGORIES);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [reFetchTicketList, setReFetchTicketList] = useState(true);
  const [reFetchInteractions, setReFetchInteractions] = useState(true);

  const reFetchTicketListContext = {
    reFetchTicketList,
    setReFetchTicketList,
  };
  const reFetchInteractionsContext = {
    reFetchInteractions,
    setReFetchInteractions,
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setReFetchTicketList(true);
    setReFetchInteractions(true);
  };

  return (
    <>
      {!!commandments && !!ticketCategories && (
        <CommandmentsContext.Provider value={commandments.getCommandments}>
          <CommandmentCategoriesContext.Provider value={ticketCategories.getTicketCategories}>
            <ReFetchTicketListContext.Provider value={reFetchTicketListContext}>
              <ReFetchInteractionsContext.Provider value={reFetchInteractionsContext}>
                <div>Tickets</div>
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
                  {/* <InteractionsByDay selectedDate={selectedDate} /> */}
                  <TicketCategories />
                  <TicketList selectedDate={selectedDate} />
                </div>
              </ReFetchInteractionsContext.Provider>
            </ReFetchTicketListContext.Provider>
          </CommandmentCategoriesContext.Provider>
        </CommandmentsContext.Provider>
      )}
    </>
  );
}
