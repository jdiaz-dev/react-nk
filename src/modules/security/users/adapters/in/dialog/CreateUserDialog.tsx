import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-apollo';
import { Navigate } from 'react-router-dom';
import { Dialog } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { CREATE_USER } from '../../out/UserQueries';
import { CreateUserRequest, CreateUserResponse, UserModel } from '../../out/user.types';

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
    marginTop: '40px',
    marginBottom: '40px',
    padding: '0px',
  },
  form: {
    width: '100%',
  },
  textField: {
    width: '100%',
    margin: '0px auto',
    marginTop: '15px',
  },
  button: {
    backgroundColor: 'blue',
    width: '100%',

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

export function CreateUserDialog({
  openCreateUserDialog,
  setopenCreateUserDialog,
}: {
  openCreateUserDialog: boolean;
  setopenCreateUserDialog: (openReadDialog: boolean) => void;
}) {
  const classes = cardStyles();

  const [user, setUser] = useState<UserModel>({ names: '', surnames: '', email: '', password: '' });
  const [userCreated, setUserCreated] = useState(false);
  const [createUser] = useMutation<CreateUserResponse, CreateUserRequest>(CREATE_USER);

  const createUserHandler = async () => {
    try {
      const res = await createUser({
        variables: {
          input: {
            ...user,
          },
        },
      });
      if (res.data) {
        setUserCreated(true);
        setopenCreateUserDialog(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (userCreated) setUserCreated(false);
  }, [userCreated]);

  if (userCreated) return <Navigate replace to="/login" />;

  return (
    <Dialog
      open={openCreateUserDialog}
      onClose={() => setopenCreateUserDialog(false)}
      fullWidth={true}
      maxWidth="xs"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <Card className={classes.card} variant="outlined">
        <form className={classes.form} noValidate autoComplete="off">
          <div style={{ width: '90%', margin: '0px auto' }}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Nombres"
              value={user.names}
              variant="outlined"
              onChange={(e) => setUser({ ...user, names: e.target.value })}
            />
            <TextField
              className={classes.textField}
              id="filled-basic"
              label="Apellidos"
              variant="outlined"
              value={user.surnames}
              onChange={(e) => setUser({ ...user, surnames: e.target.value })}
            />

            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Correo electrónico"
              value={user.email}
              variant="outlined"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <TextField
              className={classes.textField}
              id="filled-basic"
              label="Contraseña"
              variant="outlined"
              value={user.password}
              type="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <Button className={classes.button} size="small" onClick={createUserHandler}>
              Registrarse
            </Button>
          </div>
        </form>
      </Card>
    </Dialog>
  );
}
