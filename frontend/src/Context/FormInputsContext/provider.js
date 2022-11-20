import React, { useState, useMemo } from 'react';
import propTypes from 'prop-types';

import FormInputsContext from './context';

function LoginProvider({ children }) {
  const [username, setUsername] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isUsernameInValid, setIsUsernameInValid] = useState(false);

  const memo = useMemo(
    () => ({
      username,
      userPassword,
      isUsernameInValid,
      setUsername,
      setUserPassword,
      setIsUsernameInValid,
    }),
    [username, userPassword, isUsernameInValid],
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
