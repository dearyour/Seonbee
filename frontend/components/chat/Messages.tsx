import { Chip, Stack } from '@mui/material';
import axios from 'axios';
import Btn from 'components/commons/Btn';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

function Messages() {
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chatbot.messages);

  // const [isLoaded, setLoaded] = useState<boolean>(false);

  const textQuery = async (text: string) => {
    // 1. 유저가 입력한 메시지 처리
    let conversation = {
      who: 'user',
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
        'http://localhost:5000/api/dialogflow/textQuery',
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
          who: 'bot',
          content: content[0],
          quick_replies: [],
        };
      } else {
        conversation = {
          who: 'botWithQR',
          content: content[0],
          quick_replies:
            content[1].payload.fields.quick_replies.listValue.values,
        };
      }
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
      };

      dispatch(chatbotActions.saveMessage(conversation));
    }
  };

  const renderQuickReplies = (replies: any) => {
    const result = [];

    // for (let i = 0; i < replies.length; i += 4) {
    //   result.push(
    //     <div className="row" key={i}>
    //       <div className="col">
    //         <Btn filled={false} onClick={() => console.log('hihi')}>
    //           {replies[i].stringValue}
    //         </Btn>
    //       </div>
    //       <div className="col">
    //         {i + 1 < replies.length && (
    //           <Btn filled={false}>{replies[i + 1].stringValue}</Btn>
    //         )}
    //       </div>
    //       <div className="col">
    //         {i + 2 < replies.length && (
    //           <Btn filled={false}>{replies[i + 2].stringValue}</Btn>
    //         )}
    //       </div>
    //       <div className="col">
    //         {i + 3 < replies.length && (
    //           <Btn filled={false}>{replies[i + 3].stringValue}</Btn>
    //         )}
    //       </div>
    //     </div>
    //   );
    // }

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
        <MessagesDF key={i} style={{ paddingBottom: '1rem' }}>
          <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
        </MessagesDF>
      );
    } else if (message.who === 'user') {
      return (
        <MessagesUser key={i}>
          <MessagesTextUser>{message.content.text.text}</MessagesTextUser>
        </MessagesUser>
      );
    } else if (message.who === 'botWithQR') {
      return (
        <>
          <MessagesDF key={i}>
            <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
          </MessagesDF>
          <QuickReplies>
            {/* {message.quick_replies[0].stringValue} */}
            {renderQuickReplies(message.quick_replies)}
          </QuickReplies>
        </>
      );
    }
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

  return (
    <StyledMessages>
      {renderMessages(messages)}
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
