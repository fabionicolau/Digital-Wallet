import styled from 'styled-components';

export const HeaderContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  height: 8vh;
  justify-content: space-between;
  margin: auto;
  background-color: #333;
  overflow: hidden;

  .right {
    float: right;
    padding: 0;
  }

  div, button {
    float: left;
    color: #f5f5f5;
    background-color: transparent;
    border: none;
    padding: 0px;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    height: 100%;
    cursor: none;
  }

  .exit {
    cursor: pointer;
  }

  .content-div:hover{
    cursor: pointer;
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
