import { Button, Menu, MenuItem } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { TicketModel } from '../../out/ticket.types';
import { CommandmentCategoriesContext } from '../../../apocalipsex/in/ApocalipsexContainer';


export function CategoryTicketList({
  ticket,
  setTicket,
  setIsListShown = () => {},
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
        onClick={(e: any) => {
          handleClose();
          setIsListShown(false);
          setTicket({ ...ticket, ticketCategory: e.target.innerText });
        }}
      >
        {item.name}
      </MenuItem>
    ));
  }
  return (
    <div style={{ padding: '40px' }}>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => {
          handleClickButton(e);
          setIsListShown(true);
        }}
      >
        <img src="https://icon-library.com/images/50x50-icon/50x50-icon-0.jpg" width="30" height="35" alt="" />
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {categoryItems}
      </Menu>
    </div>
  );
}
