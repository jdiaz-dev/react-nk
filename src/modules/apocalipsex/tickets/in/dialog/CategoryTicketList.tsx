import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { TicketModel } from '../../out/ticket.types';
import { CommandmentCategoriesContext } from '../../../apocalipsex/in/ApocalipsexContainer';

export function CategoryTicketList({
  ticket,
  setTicket,
  setIsListShown = () => undefined,
}: {
  ticket: TicketModel;
  setTicket: (model: TicketModel) => void;
  setIsListShown?: (state: boolean) => void;
}) {
  const ticketCategoriesContext = useContext(CommandmentCategoriesContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let categoryItems;
  if (ticketCategoriesContext) {
    categoryItems = ticketCategoriesContext.map((item) => (
      <MenuItem
        key={item.name}
        onClick={(e) => {
          handleClose();
          setIsListShown(false);
          setTicket({ ...ticket, ticketCategory: (e.target as HTMLElement).innerText });
        }}
      >
        {item.name}
      </MenuItem>
    ));
  }
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        size="small"
        onClick={(e) => {
          handleClickButton(e);
          setIsListShown(true);
        }}
      >
        {ticket.ticketCategory}
      </Button>
      <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {categoryItems}
      </Menu>
    </div>
  );
}
