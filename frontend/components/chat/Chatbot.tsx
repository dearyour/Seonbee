import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useEffectOnce } from 'store/hook/useEffectOnce';

function Chatbot() {
  // const textQuery = async () => {
  //   const response = await axios.post('http://localhost:3030/text_query', {
  //     text: '안녕',
  //     userId: 'seonbee406-2022',
  //   });
  //   console.log('response from dialogflow', response);
  // };

  const dispatch = useDispatch();

  useEffectOnce(() => {
    eventQuery('WelcomeToSeonbee');
  });

  const textQuery = async (text: string) => {
    // 1. 유저가 입력한 메시지 처리
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
    };

    console.log('text I sent', conversation);
    // dispatch(saveMessage(conversation));

    // 2. 챗봇이 보낸 메시지 처리
    const textQueryVariables = {
      text,
    };

    try {
      // textQuery Route에 리퀘스트를 보낸다.
      const response = await axios.post(
        'http://localhost:5000/api/dialogflow/textQuery',
        textQueryVariables
      );
      const content = response.data.fulfillmentMessages[0];

      conversation = {
        who: 'bot',
        content: content,
      };
      console.log(conversation);
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러가 발생했습니다. 관리자에게 문의해주세요.',
          },
        },
      };
      console.log(conversation);
    }
  };

  const eventQuery = async (event: any) => {
    // 챗봇이 보낸 메시지 처리
    const eventQueryVariables = {
      event,
    };

    try {
      // eventQuery Route에 리퀘스트를 보낸다.
      const response = await axios.post(
        'http://localhost:5000/api/dialogflow/eventQuery',
        eventQueryVariables
      );

      const content = response.data.fulfillmentMessages[0];

      let conversation = {
        who: 'bot',
        content: content,
      };

      console.log(conversation);
    } catch (error) {
      let conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러가 발생했습니다. 관리자에게 문의해주세요.',
          },
        },
      };
      console.log(conversation);
    }
  };

  const keyUpHandler = (e: { key: string; target: { value: any } }) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        // we will send text query route
        textQuery(e.target.value);

        e.target.value = '';
      }
    }
  };

  return (
    <ChatbotWidget>
      {/* <ChatbotHeader>
        <h1>Seonbee Bot</h1>
      </ChatbotHeader> */}
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
          onKeyUp={keyUpHandler}
        />
        <SendBtn>
          <FiSend />
        </SendBtn>
      </ChatbotFooter>
    </ChatbotWidget>
  );
}

export default Chatbot;
