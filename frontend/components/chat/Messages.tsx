import { Avatar, Chip, Stack } from '@mui/material';
import axios from 'axios';
import Btn from 'components/commons/Btn';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { css } from '@emotion/react';
import { RootState } from 'store/slice';
import { chatbotActions } from 'store/slice/chatbot';
import {
  StyledMessages,
  MessagesUser,
  MessagesDF,
  MessagesTextUser,
  MessagesTextDF,
  QuickReplies,
} from 'styles/chat/MessageElements';
import HobeeFace from 'public/characters/hobee_face.png';
import TobeeFace from 'public/characters/tobee_face.png';
import BeatLoader from 'react-spinners/BeatLoader';

function Messages() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatbot.messages);
  const baseUrl = process.env.NEXT_PUBLIC_CHAT;
  // const [isLoaded, setLoaded] = useState<boolean>(false);

  const [character, setCharacter] = useState<number>(
    Math.floor(2 * Math.random())
  );
  const [characterTyping, setCharacterTyping] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const textQuery = async (text: string) => {
    // messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    setCharacterTyping(true);

    // 1. 유저가 입력한 메시지 처리
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
      quick_replies: [],
      question: '',
      answer: '',
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
        baseUrl + 'dialogflow/textQuery',
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
      // if (content.length == 1) {
      //   conversation = {
      //     who: 'bot',
      //     content: content[0],
      //     quick_replies: [],
      //   };
      // } else {
      //   conversation = {
      //     who: 'botWithQR',
      //     content: content[0],
      //     quick_replies:
      //       content[1].payload.fields.quick_replies.listValue.values,
      //   };
      // }
      conversation = {
        who: 'bot',
        content: content[0],
        quick_replies: content[1].payload.fields.quick_replies.listValue.values,
        question: content[1].payload.fields.qna.listValue.values[0].stringValue,
        answer: content[1].payload.fields.qna.listValue.values[1].stringValue,
      };
      dispatch(chatbotActions.saveMessage(conversation));
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러가 발생했습니다. 관리자에게 문의해주세요.',
          },
        },
        quick_replies: [],
        question: '',
        answer: '',
      };

      dispatch(chatbotActions.saveMessage(conversation));
    }

    setCharacterTyping(false);
  };

  const renderQuickReplies = (replies: any) => {
    const result = [];

    for (let i = 0; i < replies.length; i += 6) {
      result.push(
        <Stack direction="row" spacing={1} mb={1} key={i}>
          <Chip
            label={replies[i].stringValue}
            variant="outlined"
            color="warning"
            size="small"
            onClick={() => {
              textQuery(replies[i].stringValue);
            }}
          />
          {i + 1 < replies.length && (
            <Chip
              label={replies[i + 1].stringValue}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => {
                textQuery(replies[i + 1].stringValue);
              }}
            />
          )}
          {i + 2 < replies.length && (
            <Chip
              label={replies[i + 2].stringValue}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => {
                textQuery(replies[i + 2].stringValue);
              }}
            />
          )}
          {i + 3 < replies.length && (
            <Chip
              label={replies[i + 3].stringValue}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => {
                textQuery(replies[i + 3].stringValue);
              }}
            />
          )}
          {i + 4 < replies.length && (
            <Chip
              label={replies[i + 4].stringValue}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => {
                textQuery(replies[i + 4].stringValue);
              }}
            />
          )}
          {i + 5 < replies.length && (
            <Chip
              label={replies[i + 5].stringValue}
              variant="outlined"
              color="warning"
              size="small"
              onClick={() => {
                textQuery(replies[i + 5].stringValue);
              }}
            />
          )}
        </Stack>
      );
    }
    return result;
  };

  const renderOneMessage = (message: any, i: number) => {
    if (message.who === 'bot') {
      return (
        // <MessagesDF key={i} style={{ paddingBottom: '1rem' }}>
        //   <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
        // </MessagesDF>
        <Stack direction="row" spacing={2}>
          <Avatar
            alt="Hobee"
            src={character == 0 ? HobeeFace.src : TobeeFace.src}
            sx={{ width: 96, height: 96 }}
          />
          <div>
            <MessagesDF key={i}>
              <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
            </MessagesDF>
            <QuickReplies>
              {/* {message.quick_replies[0].stringValue} */}
              {message.quick_replies !== undefined &&
                renderQuickReplies(message.quick_replies)}
            </QuickReplies>
          </div>
        </Stack>
      );
    } else if (message.who === 'user') {
      return (
        <MessagesUser key={i}>
          <MessagesTextUser>{message.content.text.text}</MessagesTextUser>
        </MessagesUser>
      );
    }
    // else if (message.who === 'botWithQR') {
    //   return (
    //     <>
    //       <MessagesDF key={i}>
    //         <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
    //       </MessagesDF>
    //       <QuickReplies>
    //         {/* {message.quick_replies[0].stringValue} */}
    //         {renderQuickReplies(message.quick_replies)}
    //       </QuickReplies>
    //     </>
    //   );
    // }
  };

  const renderMessages = (messages: []) => {
    if (messages) {
      return messages.map((message, i) => {
        return renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  };

  const override = css`
    display: block;
    margin-left: 10rem;
  `;

  return (
    <StyledMessages>
      {renderMessages(messages)}
      {characterTyping && <BeatLoader color="#c0b4a5" css={override} />}
      {/* <div style={{ backgroundColor: 'palevioletred' }} ref={messagesEndRef} /> */}
      {/* <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>
          Hi, how can I help?Hi, how can I help?Hi, how can I help?Hi, how can I
          help?Hi, how can I help?Hi, how can I help?Hi, how can I help?Hi, how
          can I help?Hi, how can I help?Hi, how can I help?Hi, how can I help?
        </MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF>
      <MessagesUser>
        <MessagesTextUser>Hi</MessagesTextUser>
      </MessagesUser>
      <MessagesDF>
        <MessagesTextDF>Hi, how can I help?</MessagesTextDF>
      </MessagesDF> */}
    </StyledMessages>
  );
}

export default Messages;
