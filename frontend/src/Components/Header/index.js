import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionsContext from '../../Context/TransactionsContext/context';
import FormInputsContext from '../../Context/FormInputsContext/context';
import * as S from './style';

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
    <S.HeaderContainer>
      <button
        type="button"
        className="content-div"
      >
        D-Wallet
      </button>

      <div className="right">
        <button
          type="button"
          className="content-div"
        >
          { `${user.username}` }
        </button>
        <button
          type="button"
          className="content-div"
        >
          { `R$ ${balance} `}
        </button>
        <button
          className="content-div exit"
          type="button"
          onClick={ logOut }
        >
          Sair
        </button>
      </div>

    </S.HeaderContainer>
  );
}

export default Header;
