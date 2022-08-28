import React, { useContext, useState } from 'react';
import { useMutation } from 'react-apollo';
import { saveDataUser } from '../../../../../../shared/helpers/LocalStorage';
import { logIn } from '../../out/SecurityQueries';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../../../App';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { LoginMutation, LoginRequest } from '../../out/security.types';

const cardStyles = makeStyles({
  container: {
    margin: '0px',
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  card: {
    minWidth: 275,
    width: '70%',
    margin: '0px auto',
    padding: '0px',
  },
  form: {
    width: '100%',
  },
  textField: {
    width: '90%',
    marginTop: '15px',
  },
  button: {
    backgroundColor: 'blue',
    width: '90%',

    color: 'white',
    height: '45px',
    marginTop: '15px',
    marginBottom: '15px',
    '&:hover': {
      backgroundColor: 'blue',
    },
  },
  title: {
    fontSize: 14,
    width: '85%',
  },
  pos: {
    marginBottom: 12,
  },
});

export function LogIn() {
  const classes = cardStyles();

  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginHandler, { data }] = useMutation<LoginMutation, LoginRequest>(logIn);
  if (data) {
    saveDataUser(data.logIn);
    authContext.setIsAuthenticated(true);
    return <Navigate replace to="/sidenav/tickets" />;
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card} variant="outlined">
        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Correo electrónico"
            value={email}
            variant="outlined"
            onChange={handleEmailChange}
          />
          <TextField
            className={classes.textField}
            id="filled-basic"
            label="Contraseña"
            variant="outlined"
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            className={classes.button}
            size="small"
            onClick={() =>
              loginHandler({
                variables: {
                  input: {
                    email,
                    password,
                  },
                },
              })
            }
          >
            Iniciar sesión
          </Button>
        </form>
      </Card>
    </div>
  );
}
