import styled from 'styled-components';

export const TitleP = styled.div`
    width: 100%;
    margin-bottom: 0%;
    text-align: center;
    background-color: white;
    color: black;
    margin: 0;
    padding: 10px
`;

export const TransferContainer = styled.div`
    display: flex;
    background-color: darkcyan;
    width: 100%;

  label, input {
    width: 40%;
    display: block;
    padding: 12px;
    box-sizing: border-box;
  }

  input, select {
    width: 100%;
    height: 30px;
    margin: 8px 0;
  }

  button {
    width: 180px;
    height: 30px;
    margin-top: 20px;
    text-align: center;
    background-color: #398368;
    font-weight: bold;
    color: white;
    border-radius: 5px;
  }

  button:hover {
    background-color: #398368;
    transition: 0.5s;
    cursor: pointer;
  }
`;
