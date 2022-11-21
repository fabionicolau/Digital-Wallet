import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import FormInputsContext from './context';

function LoginProvider({ children }) {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const memo = useMemo(
    () => ({
      username,
      userPassword,
      setUsername,
      setUserPassword,
    }),
    [username, userPassword],
  );

  return (
    <FormInputsContext.Provider value={ memo }>
      {children}
    </FormInputsContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default LoginProvider;
