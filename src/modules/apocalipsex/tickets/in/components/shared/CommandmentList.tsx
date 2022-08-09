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
  setIsListShown = () => {},
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
        onClick={(e: any) => {
          handleClose();
          setIsListShown(false);
          setTicket({ ...ticket, commandment: e.target.innerText });
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
        <img src="https://icon-library.com/images/50x50-icon/50x50-icon-0.jpg" width="25" height="30" alt="" />
      </Button>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {commandmentItems}
      </Menu>
    </div>
  );
}
