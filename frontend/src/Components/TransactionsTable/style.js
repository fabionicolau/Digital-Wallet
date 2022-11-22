import styled from 'styled-components';

export const Title = styled.div`
    width: 100%;
    margin-bottom: 0%;
    text-align: center;
    background-color: white;
    color: black;
    margin: 0;
    padding: 10px
`;

export const Table = styled.table`
    background-color: #14213d;
    border-collapse: collapse;
    color: white;
    width: 100%;

    th {
      padding: 10px;
    }

`;

export const Td = styled.td`
    background-color: white;
    color: black;
    padding: 5px;
    text-align: center;
`;

export const valueTd = styled.td`
    background-color: white;
    color: ${(props) => (props.username === props.credited ? 'green' : 'red')};
    padding: 5px;
    text-align: center;
`;
