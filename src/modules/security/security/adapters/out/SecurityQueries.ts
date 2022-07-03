import { gql } from "apollo-boost";

export const logIn = gql`
  mutation doLogin($input: LoginDto!) {
    logIn(input: $input) {
      userId
      token
    }
  }
`