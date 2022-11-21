import styled from 'styled-components';

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 10vh;
  justify-content: space-between;
  margin: auto;
  width: 90%;
`;

export const LogoContainer = styled.div`
  color: green;
  display: flex;
  justify-content: flex-start;
`;

export const UserNameContainter = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 10vh;
  justify-content: flex-end;

  p {
    margin-right: 50px;
  }
`;

export const ValueContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 10vh;
  justify-content: flex-end;

  p {
    margin-right: 10px;
  }
`;
