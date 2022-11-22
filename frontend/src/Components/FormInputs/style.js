import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.8rem;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  button {
    width: 6%;
    padding-left: 10px;
    height: 50px;
    border: none;
    border-radius: 10px;
    margin: 2px 10px;
    color: #fff;
    outline: none;
    display: flex;
    flex-direction: column;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    border: 1px solid #fff;
    background-color: #7431f4;
    margin: 10px;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
      background-color: #5a1fcb;
      color: white;
      border-color: white;
    }
    :disabled {
      opacity: 0.5;
      cursor: not-allowed;
      color: #ddd9ce;
    }

    @media(max-width: 700px) {
      margin-top: 15px;
      margin-bottom: 0px;
      width: 70%; 
    }
  }

  input {
    width: 20%;
    padding-left: 10px;
    height: 50px;
    border: 1px solid #fff;
    background-color: white;
    border-radius: 10px; 
    margin: 2px 10px;
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    font-weight: bold;

    ::placeholder {
      color: #ccc;
    }

    @media(max-width: 700px) {
      width: 70%; 
    }
  }
`;

export const Container = styled.div`
  background-color: black;
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  div {
    margin-top: 10px;
    padding: 10px;
    display: flex;
    color: white;
    
  }
`;