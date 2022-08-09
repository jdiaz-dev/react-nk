import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.scss';
import { TicketCategoriesDetail, TicketCategoriesResponse } from '../out/types';
import { CommandmentCategoriesContext } from '../../apocalipsex/in/ApocalipsexContainer';

const useStyles = makeStyles({
  root: {
    // minWidth: 100,
    // maxWidth: 300,
    // width: "30%",
    background: 'red',
  },
  bullet: {
    // display: "flex",
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

function CategoryTicket({ name }: { name: string }) {
  const classes = useStyles();

  return (
    <div className="category-container">
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </div>
  );
}

function TicketCategories() {
  const ticketCategoriesContext = useContext(CommandmentCategoriesContext);
  let ticketCategories;

  if (ticketCategoriesContext) {
    ticketCategories = ticketCategoriesContext.map((ticketCategory: TicketCategoriesDetail) => (
      <CategoryTicket key={ticketCategory.name} name={ticketCategory.name} />
    ));
  }

  return <div className="tickets">{ticketCategories}</div>;
}

export default TicketCategories;
