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
      <S.LogoContainer>
        <h1>NG.CASH</h1>
      </S.LogoContainer>
      <S.UserNameContainter>
        <p>{ `Usuário: ${user.username}` }</p>
        <S.ValueContainer>
          <p>{ `Saldo: ${balance} `}</p>
        </S.ValueContainer>
        <div>
          <button
            type="button"
            onClick={ logOut }
          >
            Sair
          </button>
        </div>
      </S.UserNameContainter>
    </S.HeaderContainer>
  );
}

export default Header;
