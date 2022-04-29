import React from 'react';
import Avatar from '@mui/material/Avatar';
import { InputBase } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import Messages from './Messages';
import {
  ChatbotWidget,
  ChatbotHeader,
  ChatbotBody,
  ChatbotFooter,
  SendBtn,
} from 'styles/chat/ChatbotElements';

function Chatbot() {
  const textQuery = async () => {
    const response = await axios.post('http://localhost:3030/text_query', {
      text: '안녕',
      userId: 'seonbee406-2022',
    });
    console.log('response from dialogflow', response);
  };

  return (
    <ChatbotWidget>
      <ChatbotHeader>
        <h1>Seonbee Bot</h1>
      </ChatbotHeader>
      <ChatbotBody>
        {/* component messages */}
        <Messages />
      </ChatbotBody>
      <ChatbotFooter>
        <Avatar
          alt="avatar"
          src="https://joeschmoe.io/api/v1/random"
          sx={{ width: 24, height: 24 }}
        />
        <InputBase
          style={{ borderBottom: '1px solid black' }}
          sx={{ ml: 1, flex: 0.8 }}
          placeholder="대답해 주시오"
        />
        <SendBtn onClick={() => textQuery()}>
          <FiSend />
        </SendBtn>
      </ChatbotFooter>
    </ChatbotWidget>
  );
}

export default Chatbot;
