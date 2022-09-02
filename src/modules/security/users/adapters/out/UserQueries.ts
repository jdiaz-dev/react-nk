import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      userId
      names
      surnames
    }
  }
`;
