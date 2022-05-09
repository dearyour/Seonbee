<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d10b2204481800fdb47f50240fc34c09c8e1d771
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { InputBase } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';
import Messages from './Messages';
<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { InputBase } from "@mui/material";
import { FiSend } from "react-icons/fi";
import axios from "axios";
import Messages from "./Messages";
>>>>>>> c1679fc6d3e161e338ed9dafda1050a479f6c822
=======
>>>>>>> d10b2204481800fdb47f50240fc34c09c8e1d771
import {
  ChatbotWidget,
  ChatbotHeader,
  ChatbotBody,
  ChatbotFooter,
  SendBtn,
} from "styles/chat/ChatbotElements";
import { useEffectOnce } from "store/hook/useEffectOnce";
import { chatbotActions } from "store/slice/chatbot";

function Chatbot() {
  // const textQuery = async () => {
  //   const response = await axios.post('http://localhost:3030/text_query', {
  //     text: '안녕',
  //     userId: 'seonbee406-2022',
  //   });
  //   console.log('response from dialogflow', response);
  // };

  const dispatch = useDispatch();
  const [currInput, setCurrInput] = useState<string>('');
  // const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLInputElement>(null);

  useEffectOnce(() => {
    dispatch(chatbotActions.resetMessage());
    eventQuery("WelcomeToSeonbee");
  });

  const textQuery = async (text: string) => {
    // 1. 유저가 입력한 메시지 처리
    let conversation = {
      who: "user",
      content: {
        text: {
          text: text,
        },
      },
      quick_replies: [],
    };

    dispatch(chatbotActions.saveMessage(conversation));
    // console.log('text I sent', conversation);

    // 2. 챗봇이 보낸 메시지 처리
    const textQueryVariables = {
      text,
    };

    try {
      // textQuery Route에 리퀘스트를 보낸다.
      const response = await axios.post(
        "http://localhost:5000/api/dialogflow/textQuery",
        textQueryVariables
      );
      // const content = response.data.fulfillmentMessages[0];
      // const content = {
      //   text: {
      //     text: response.data.fullfillmentMessages[0].text.text[0],
      //   },
      // };

      // for (let content of response.data.fulfillmentMessages) {
      //   conversation = {
      //     who: 'bot',
      //     content: content,
      //   };
      //   dispatch(chatbotActions.saveMessage(conversation));
      // }
      const content = response.data.fulfillmentMessages;
      if (content.length == 1) {
        conversation = {
          who: "bot",
          content: content[0],
          quick_replies: [],
        };
      } else {
        conversation = {
          who: "botWithQR",
          content: content[0],
          quick_replies:
            content[1].payload.fields.quick_replies.listValue.values,
        };
      }
      dispatch(chatbotActions.saveMessage(conversation));
    } catch (error) {
      conversation = {
        who: "bot",
        content: {
          text: {
            text: "에러가 발생했습니다. 관리자에게 문의해주세요.",
          },
        },
        quick_replies: [],
      };

      dispatch(chatbotActions.saveMessage(conversation));
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
        "http://localhost:5000/api/dialogflow/eventQuery",
        eventQueryVariables
      );

      // const content = response.data.fulfillmentMessages[0];
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: "bot",
          content: content,
        };

        dispatch(chatbotActions.saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: "bot",
        content: {
          text: {
            text: "에러가 발생했습니다. 관리자에게 문의해주세요.",
          },
        },
      };

      dispatch(chatbotActions.saveMessage(conversation));
    }
  };

  const keyUpHandler = (e: any) => {
    if (e.key === "Enter") {
      if (e.target.value) {
        // we will send text query route
        textQuery(e.target.value);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d10b2204481800fdb47f50240fc34c09c8e1d771
        e.target.value = '';
        // setCurrInput('');

        console.log(scrollRef == null);

        console.log(scrollRef.current == null);

        // scrollRef.current?.scrollIntoView();
<<<<<<< HEAD
=======
        e.target.value = "";
>>>>>>> c1679fc6d3e161e338ed9dafda1050a479f6c822
=======
>>>>>>> d10b2204481800fdb47f50240fc34c09c8e1d771
      }
    }
  };

  const sendInput = () => {
    if (currInput) {
      textQuery(currInput);

      setCurrInput('');

      // if (inputRef.current) {
      //   inputRef.current.value = '';
      //   inputRef.current.focus();
      // }
    }
  };

  return (
    <ChatbotWidget>
      {/* <ChatbotHeader>
        <h1>Seonbee Bot</h1>
      </ChatbotHeader> */}
      <ChatbotBody ref={scrollRef}>
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
          style={{ borderBottom: "1px solid black" }}
          sx={{ ml: 1, flex: 0.8 }}
          placeholder="대답해 주시오"
          value={currInput}
          onKeyUp={keyUpHandler}
          onChange={(e) => setCurrInput(e.target.value)}
          // ref={inputRef}
        />
        <SendBtn onClick={sendInput}>
          <FiSend />
        </SendBtn>
      </ChatbotFooter>
    </ChatbotWidget>
  );
}

export default Chatbot;
