import styled from '@emotion/styled';
import { InputBase } from '@mui/material';
import { FiSend } from 'react-icons/fi';

export const ChatbotWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const ChatbotWidget = styled.div`
  /* position: absolute;
  bottom: 2rem;
  right: 2rem; */

  width: 60%;
  background-color: transparent;
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
  height: calc(100vh - 200px);
  background-color: transparent;
  margin: 0.2rem;
  border-radius: 8px;
  overflow-y: scroll;
`;

export const ChatbotFooter = styled.div`
  height: 4rem;
  background-color: transparent;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SendBtn = styled.div`
  height: 1.8rem;
  width: 1.8rem;
  background-color: #e9e5e1;
  border-radius: 8px;
  margin-left: 0.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #c0b4a5;
    transition: 0.3s ease;
  }
`;
