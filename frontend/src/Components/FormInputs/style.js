import styled from 'styled-components';

export const Form = styled.form`
  align-items: center;
  background-color: #999;
  border-radius: 8px;
  justify-content: center;
  margin-bottom: 10%;
  margin-top: 10%;
  max-width: 45%;
  padding: 20px;
  transform: translate(50%);
`;

export const InputForm = styled.input`
  border: 1px solid #ccc;
  box-sizing: border-box;
  display: inline-block;
  margin: 8px 0;
  padding: 12px 20px;
  width: 100%;
`;

export const ButtonForm = styled.button`
  background-color: #7431f4;
  border: none;
  color: white;
  cursor: pointer;
  margin: 8px 0;
  padding: 14px 20px;
  width: 100%;

  &:disabled {
    cursor: no-drop;
    opacity: 0.3;
  }

  &:hover {
    background-color: #5a1fcb;
  }
`;

export const Container = styled.div`
  padding: 20px;
`;

export const ImgDiv = styled.div`
  margin: 24px 0 12px;
  text-align: center;

  img {
    border-radius: 50%;
    width: 150px;
  }
`;

export const TitleForm = styled.h3`
  text-align: center;
`;
