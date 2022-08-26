import { getToken } from './../shared/helpers/LocalStorage';
import ApolloClient from "apollo-boost";

export const client = new ApolloClient({
  uri:'http://localhost:3000/graphql',
  // uri:'http://ec2-18-212-53-234.compute-1.amazonaws.com/graphql',
  fetchOptions:{
    credentials: "include"
  },
  request: operation => {
    const token = getToken() 
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
})
