import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionsContext from '../../Context/TransactionsContext/context';
import FormInputsContext from '../../Context/FormInputsContext/context';

function Header() {
  const [balance, setBalance] = useState(0);

  const navigate = useNavigate();

  const { transactions } = useContext(TransactionsContext);
  const { setUsername, setUserPassword } = useContext(FormInputsContext);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchBalance = async () => {
      const request = await fetch('http://localhost:3001/balance', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
      });
      const response = await request.json();
      setBalance(response.balance);
    };
    fetchBalance();
  }, [user.token, transactions]);

  const logOut = () => {
    localStorage.removeItem('user');
    setUserPassword('');
    setUsername('');
    return navigate('/login');
  };

  return (
    <header>
      <h1>NG.CASH</h1>
      <h3>{ `Usuário: ${user.username}` }</h3>
      <h3>{ `Saldo: ${balance} `}</h3>

      <button
        type="button"
        onClick={ logOut }
      >
        Sair
      </button>
    </header>
  );
}

export default Header;
