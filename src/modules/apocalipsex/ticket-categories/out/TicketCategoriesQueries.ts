import { gql } from 'apollo-boost';

export const GET_TICKET_CATEGORIES = gql`
  query _getTicketCategories {
    getTicketCategories {
      name
      description
    }
  }
`;
