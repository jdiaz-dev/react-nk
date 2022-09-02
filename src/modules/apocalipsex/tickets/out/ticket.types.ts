export type UpdateTicketToAchievedMutation = {
  updateTicketToAchieved: TicketModel;
};

export type UpdateTicketToAchievedRequest = {
  input: {
    _id: string;
    achieved: boolean;
  };
};

export type TicketModel = {
  _id?: string;
  content: string;
  commandment: string;
  ticketCategory: string;
  resultTicket?: {
    achieved: boolean;
    marked: boolean;
  };
  dateOffset?: number;
  __typename?: string;
};

export type GetTicketGroupedByDay = {
  _id: string;
  tickets: TicketModel[];
};

export type GetTicketGroupedByDayMutation = {
  getTicketsGroupedByDay: GetTicketGroupedByDay[];
};

export type GetTicketGroupedByDayRequest = {
  input: {
    startDate: string;
    endDate: string;
  };
};
