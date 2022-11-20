import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import loginContext from './context';

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
    <loginContext.Provider value={ memo }>
      {children}
    </loginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default LoginProvider;
