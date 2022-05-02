import styled from '@emotion/styled';
import { InputBase } from '@mui/material';
import { FiSend } from 'react-icons/fi';

export const ChatbotWidget = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  width: 30rem;
  background-color: #e2d7c8;
  border-radius: 1.2rem;
  /* z-index: 1000; */
  overflow: hidden;
`;

export const ChatbotHeader = styled.div`
  height: 4rem;
  background-color: #483313;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatbotBody = styled.div`
  height: 30rem;
  background-color: #fff;
  margin: 0.2rem;
  border-radius: 8px;
  overflow-y: scroll;
`;

export const ChatbotFooter = styled.div`
  height: 6rem;
  background-color: palevioletred;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SendBtn = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  background-color: royalblue;
  border-radius: 8px;
  margin-left: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: bisque;
    transition: 0.3s ease;
  }
`;
