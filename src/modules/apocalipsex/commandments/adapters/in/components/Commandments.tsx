import React from 'react';
import { useQuery } from 'react-apollo';
import { GET_COMMANDMENTS } from '../../out/CommandmentsQueries';

function Commandment({ commandment }: { commandment: any }) {
  return <li>{commandment.name}</li>;
}

//Commandments only is responsible to rende Commandment component
export function Commandments() {
  const { data } = useQuery(GET_COMMANDMENTS);
  let commandments;
  if (data) {
    commandments = data.getCommandments.map((commandment: any) => (
      /* 
        key prop
          - key allow to react identify which items in the lisht have changed, added or removed and place a crucial role in handling UI updates efficiently
          - key server to react to match previous tree with the subsequent tree comparing the key
          - key give to the elements stable identity 
          - key={commandment._id}  :  passing _id to pass unique value to key property 
          - we can pass any unique value to key property, for intance commandment.commandment 
          - key property is not accesible in child component
          - it is so because key keyword is reserved
      */
      <Commandment key={commandment._id} commandment={commandment} />
    ));
  }

  const getCommandments = async () => {};
  return (
    <div onLoad={getCommandments}>
      <ul>{commandments}</ul>
    </div>
  );
}

export default Commandments;

//the recommended way is refactor the jsx into a separated component
