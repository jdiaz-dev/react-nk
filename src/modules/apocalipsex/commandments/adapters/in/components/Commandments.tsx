/* eslint-disable max-len */
/* eslint-disable spaced-comment */
import React from 'react';
import { useQuery } from 'react-apollo';
import { CommandmentDetail, GetCommandmentsResponse } from '../../out/commandments.types';
import { GET_COMMANDMENTS } from '../../out/CommandmentsQueries';
import Chip from '@material-ui/core/Chip';

function Commandment({ commandment }: { commandment: CommandmentDetail }) {
  return (
    <>
      <Chip style={{ marginBottom: '5px', width: '20%' }} label={commandment.name} />
      <br />
    </>
  );
}

//Commandments only is responsible to rende Commandment component

export function Commandments() {
  const { data } = useQuery<GetCommandmentsResponse>(GET_COMMANDMENTS);
  let commandments;
  if (data) {
    commandments = data.getCommandments.map((commandment: CommandmentDetail) => (
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

  return (
    <div>
      <ul>{commandments}</ul>
    </div>
  );
}

export default Commandments;

//the recommended way is refactor the jsx into a separated component
