import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-apollo';
import { createCustomDate } from '../../../../shared/helpers/functions';
import {
  GetInteractionsByDayRequest,
  GetInteractionsByDayQuery,
  InteractionsRes,
  InteractionsModel,
} from '../out/interaction.types';
import { GET_INTERACTION_BY_DAY } from '../out/InteractionQueries';
import './styles.scss';
import UpdateInteractionsByDayDialog from './UpdateInteractionsByDayDialog';
import { ReFetchInteractionsContext } from '../../apocalipsex/in/ApocalipsexContainer';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const defaultInteractions = { totalMen: 0, totalWomen: 0, totalGroups: 0 };
export function InteractionsByDay({ selectedDate }: { selectedDate: Date | null }) {
  const reFetchInteractionsContext = useContext(ReFetchInteractionsContext);

  const [interactions, setInteractions] = useState<InteractionsRes>(defaultInteractions);
  const [interactionsModel, setInteractionsModel] = useState<InteractionsModel>(defaultInteractions);
  console.log('--------interactionsModel', interactionsModel)
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const { loading, refetch } = useQuery<GetInteractionsByDayQuery, GetInteractionsByDayRequest>(GET_INTERACTION_BY_DAY, {
    variables: {
      input: {
        startDate: createCustomDate(selectedDate, 0, 0, 0),
        endDate: createCustomDate(selectedDate, 23, 59, 59),
      },
    },
  });
  const classes = useStyles();

  useEffect(() => {
    console.log('------reFetchInteractions', reFetchInteractionsContext.reFetchInteractions);
    if (reFetchInteractionsContext.reFetchInteractions) {
      refetch({
        input: {
          startDate: createCustomDate(selectedDate, 0, 0, 0),
          endDate: createCustomDate(selectedDate, 23, 59, 59),
        },
      }).then((res) => {
        if (res.data.getInteractionsByDay !== null) {
          const { __typename, ..._interactions } = res.data.getInteractionsByDay.interactions;
          setInteractions(_interactions);
          setInteractionsModel({ _id: res.data.getInteractionsByDay._id, ..._interactions });
        }
      });
    }
    reFetchInteractionsContext.setReFetchInteractions(false);

    return () => {
      setInteractions(defaultInteractions);
      setInteractionsModel(interactionsModel);

    };
  }, [selectedDate, reFetchInteractionsContext.reFetchInteractions]);

  // if (loading) return <div>loading...</div>;
  let _interactions;
  _interactions = Object.keys(interactions).map((interaction, index) => (
    <Card key={index} className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {interaction}: {interactions[interaction]}
        </Typography>
      </CardContent>
    </Card>
  ));
  return (
    <div className="containerInteractions">
      <div>Total de abordajes</div>
      <div className="boxInteractions" onClick={() => setOpenUpdateDialog(true)}>
        {_interactions}
      </div>
      <UpdateInteractionsByDayDialog
        openUpdateDialog={openUpdateDialog}
        setOpenUpdateDialog={setOpenUpdateDialog}
        interactionsss={interactionsModel}
      />
    </div>
  );
}

/* <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                {{interaction}}
              </Typography>
              <Typography variant="h5" component="h2">
                be
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card> */
