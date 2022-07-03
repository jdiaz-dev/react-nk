import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { saveDataUser } from '../../../../../../shared/helpers/LocalStorage';
import { logIn } from '../../out/SecurityQueries';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginHandler, { data }] = useMutation(logIn);
  if (data) saveDataUser(data.logIn);

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <div>
      <form>
        <label>
          Email:
          <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          password:
          <input type="text" name="name" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </label>
        <button
          type="button"
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
          Login
        </button>
      </form>
    </div>
  );
}

export default LogIn;
