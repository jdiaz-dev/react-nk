import { gql } from 'apollo-boost';

export const CREATE_TICKET = gql`
  mutation _createTicket($input: CreateTicketDto!) {
    createTicket(input: $input) {
      _id
      commandment
      content
      ticketCategory
      createdAt
    }
  }
`;

export const GET_TICKETS_GROUPED_BY_DAY = gql`
  query _getTicketsGroupedByDay($input: GetTicketsGroupedByDayDto!) {
    getTicketsGroupedByDay(input: $input) {
      _id
      tickets {
        _id
        ticketCategory
        content
        commandment
        achieved
      }
    }
  }
`;

export const UDPDATE_TICKET = gql`
  mutation _updateTicket($input: UpdateTicketDto!) {
    updateTicket(input: $input) {
      _id
      commandment
      content
      ticketCategory
      createdAt
    }
  }
`;

export const DELETE_TICKET = gql`
  mutation _removeTicket($input: RemoveTicketDto!) {
    removeTicket(input: $input) {
      _id
      commandment
      content
    }
  }
`;

export const UPDATE_TICKET_TO_ACHIVED = gql`
  mutation _updateTicketToAchieved($input: UpdateTicketToAchieved!) {
    updateTicketToAchieved(input: $input) {
      _id
      commandment
      content
      ticketCategory
    }
  }
`;
