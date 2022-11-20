import React, { useEffect, useState, useContext } from 'react';
import TransactionsContext from '../../Context/TransactionsContext/context';

function Header() {
  const [balance, setBalance] = useState(0);

  const { transactions } = useContext(TransactionsContext);

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

  return (
    <header>
      <h1>TrybeWallet</h1>
      <h3>{ `${user.username} - ${balance} `}</h3>
    </header>
  );
}

export default Header;
