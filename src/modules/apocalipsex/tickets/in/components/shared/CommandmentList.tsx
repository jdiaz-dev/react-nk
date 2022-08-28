import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import { TicketModel } from '../../../out/ticket.types';
import { useContext } from 'react';
import { CommandmentsContext } from '../../../../apocalipsex/in/ApocalipsexContainer';

export function CommandmentList({
  ticket,
  setTicket,
  setIsListShown = () => undefined,
}: {
  ticket: TicketModel;
  setTicket: (model: TicketModel) => void;
  setIsListShown?: (state: boolean) => void;
}) {
  const commandmentContext = useContext(CommandmentsContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClickButton = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let commandmentItems;
  if (commandmentContext) {
    commandmentItems = commandmentContext.map((item) => (
      <MenuItem
        key={item.name}
        onClick={(e) => {
          handleClose();
          setIsListShown(false);
          setTicket({ ...ticket, commandment: (e.target as HTMLElement).innerText });
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
        variant="contained"
        size="small"
        style={{ width: '70%' }}
        onClick={(e) => {
          handleClickButton(e);
          setIsListShown(true);
        }}
      >
        {ticket.commandment ? ticket.commandment : 'Mandamiento'}
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
        {commandmentItems}
      </Menu>
    </div>
  );
}
