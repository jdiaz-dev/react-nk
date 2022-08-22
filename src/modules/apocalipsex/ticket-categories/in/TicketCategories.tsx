import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.scss';
import { TicketCategoriesDetail, TicketCategoriesResponse } from '../out/types';
import { CommandmentCategoriesContext } from '../../apocalipsex/in/ApocalipsexContainer';

const stylesCard = makeStyles({
  root: {
    height: '45px',
  },
  bullet: {
    // display: "flex",
    // margin: '0 2px',
  },
  title: {
    fontSize: 14,
  },
  /* pos: {
    marginBottom: 12,
  }, */
});

const stylesCardContent = makeStyles({
  root: {
    background: 'blue',
    margin: '0px',
    padding: '0px',
  },
});

const stylesTypography = makeStyles({
  root: {
    background: 'blue',
    height: '45px',
    lineHeight: '45px',
    textAlign: 'left',
    paddingLeft: '10px'
  },
  title: {
    fontSize: 14,
  },
});

function CategoryTicket({ name }: { name: string }) {
  const classCard = stylesCard();
  const classCardContent = stylesCardContent();
  const classTypography = stylesTypography();

  return (
    <div className="category-container">
      <Card className={classCard.root}>
        <CardContent className={classCardContent.root}>
          <Typography className={classTypography.root} variant="h5" component="h2">
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

export function TicketCategories() {
  const ticketCategoriesContext = useContext(CommandmentCategoriesContext);
  let ticketCategories;

  if (ticketCategoriesContext) {
    ticketCategories = ticketCategoriesContext.map((ticketCategory: TicketCategoriesDetail) => (
      <CategoryTicket key={ticketCategory.name} name={ticketCategory.name} />
    ));
  }

  return <div className="ticket-categories">{ticketCategories}</div>;
}
