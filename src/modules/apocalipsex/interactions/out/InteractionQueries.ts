import { gql } from 'apollo-boost';

export const CREATE_INTERACTIONS = gql`
  mutation _createInteraction($input: CreateInteractionDto!) {
    createInteraction(input: $input) {
      _id
      totalMen
      totalWomen
      totalGroups
    }
  }
`;

export const GET_INTERACTION_BY_DAY = gql`
  query _getInteractionsByDay($input: GetInteractionsByDayDto!) {
    getInteractionsByDay(input: $input) {
      _id
      interactions {
        totalMen
        totalWomen
        totalGroups
      }
    }
  }
`;

export const UPDATE_INTERACTIONS = gql`
  mutation _updateInteraction($input: UpdateInteractionDto!) {
    updateInteraction(input: $input) {
      _id
      totalMen
      totalWomen
      totalGroups
    }
  }
`;
