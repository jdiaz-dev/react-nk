export type TicketModel = {
  _id?: string;
  content: string;
  commandment: string;
  ticketCategory: string;
  achieved?: boolean;
  dateOffset?: number;
  __typename?: string;
};

export type GetTicketGroupedByDay = {
  _id: string;
  tickets: TicketModel[];
};

export type GetTicketGroupedByDayResponse = {
  getTicketsGroupedByDay: GetTicketGroupedByDay[];
};

export type GetTicketGroupedByDayRequest = {
  input: {
    startDate: string;
    endDate: string;
  };
};
