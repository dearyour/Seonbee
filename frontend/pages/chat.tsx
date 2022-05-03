import Chatbot from 'components/chat/Chatbot';
import Navbar from 'components/commons/bars/Navbar';
import React from 'react';
import { ChatbotWrapper } from 'styles/chat/ChatbotElements';

function chat() {
  return (
    <>
      <Navbar />
      <ChatbotWrapper>
        <Chatbot />
      </ChatbotWrapper>
    </>
  );
}

export default chat;
