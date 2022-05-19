import Chatbot from 'components/chat/Chatbot';
import Navbar from 'components/commons/bars/Navbar';
import Head from 'next/head';
import React from 'react';
import { ChatbotWrapper } from 'styles/chat/ChatbotElements';

function chat() {
  return (
    <>
      <Head>
        <title>선비 | 추천 받기</title>
      </Head>
      <ChatbotWrapper>
        <Chatbot />
      </ChatbotWrapper>
    </>
  );
}

export default chat;
