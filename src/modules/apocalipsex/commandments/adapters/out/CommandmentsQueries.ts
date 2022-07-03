import { gql } from "apollo-boost";

export const GET_COMMANDMENTS = gql`
  query _getCommandments{
    getCommandments{
      _id,
      name,
      description
    }
  }
`