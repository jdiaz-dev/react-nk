/* eslint-disable indent */
import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { createCustomDate } from '../../../../shared/helpers/functions';
import {
  GetInteractionsByDayRequest,
  GetInteractionsByDayQuery,
  InteractionsRes,
  InteractionsModel,
  InteractionsTuple,
} from '../out/interaction.types';
import { GET_INTERACTION_BY_DAY } from '../out/InteractionQueries';
import './styles.scss';
import UpdateInteractionsByDayDialog from './UpdateInteractionsByDayDialog';
import { ReFetchInteractionsContext } from '../../apocalipsex/in/ApocalipsexContainer';
import { GenderEnum, InteractionsEnum } from '../../../../shared/Consts';
import { useQuery } from 'react-apollo';

const chipStyles = makeStyles({
  card: {
    height: 40,
    marginBottom: 10,
  },
  chip: {
    width: '40%',
    borderRadius: '5px',
    backgroundColor: '#434156',
    color: 'white',
    fontSize: '16px',
    marginLeft: '2%',
    marginRight: '2%',
    cursor: 'pointer',
  },
});

const defaultInteractions = { totalMen: 0, totalWomen: 0, totalGroups: 0 };
export function InteractionsByDay({ selectedDate }: { selectedDate: Date | null }) {
  const reFetchInteractionsContext = useContext(ReFetchInteractionsContext);

  const [interactions, setInteractions] = useState<InteractionsRes>(defaultInteractions);
  const [interactionsModel, setInteractionsModel] = useState<InteractionsModel>(defaultInteractions);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { refetch } = useQuery<GetInteractionsByDayQuery, GetInteractionsByDayRequest>(GET_INTERACTION_BY_DAY, {
    variables: {
      input: {
        startDate: createCustomDate(selectedDate, 0, 0, 0),
        endDate: createCustomDate(selectedDate, 23, 59, 59),
      },
    },
  });

  const classes = chipStyles();

  useEffect(() => {
    if (reFetchInteractionsContext.reFetchInteractions) {
      refetch({
        input: {
          startDate: createCustomDate(selectedDate, 0, 0, 0),
          endDate: createCustomDate(selectedDate, 23, 59, 59),
        },
      })
        .then((res) => {
          if (res.data.getInteractionsByDay !== null) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { __typename, ..._interactions } = res.data.getInteractionsByDay.interactions;
            setInteractions(_interactions);
            setInteractionsModel({ _id: res.data.getInteractionsByDay._id, ..._interactions });
          }
        })
        .catch((err) => {
          console.log('-------err', err);
        });
    }
    reFetchInteractionsContext.setReFetchInteractions(false);

    return () => {
      setInteractions(defaultInteractions);
      setInteractionsModel(interactionsModel);
    };
  }, [selectedDate, reFetchInteractionsContext.reFetchInteractions]);

  // if (loading) return <div>loading...</div>;
  const _interactions = Object.keys(interactions).map((interaction, index) => (
    <Chip
      key={index}
      className={classes.chip}
      label={`${
        interaction == InteractionsEnum.TOTAL_MEN
          ? GenderEnum.MAN
          : interaction == InteractionsEnum.TOTAL_WOMEN
          ? GenderEnum.WOMAN
          : GenderEnum.GROUP
      }: ${interactions[interaction as InteractionsTuple]}`}
    />
  ));
  return (
    <>
      <div className="containerInteractions" onClick={() => setOpenUpdateDialog(true)}>
        <Card className={`cardInteractions ${classes.card}`}>
          <Typography variant="h6" component="h3">
            Abordajes
          </Typography>

          <div className="boxInteractions">{_interactions}</div>
        </Card>
      </div>
      <UpdateInteractionsByDayDialog
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={setOpenUpdateDialog}
        interactionsss={interactionsModel}
      />
    </>
  );
}
