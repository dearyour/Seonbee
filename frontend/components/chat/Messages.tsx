import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/slice';
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

  const renderQuickReplies = (replies: any) => {
    const result = [];

    for (let i = 0; i < replies.length; i += 4) {
      result.push(
        <div className="row">
          <div className="col">{replies[i].stringValue}</div>
          <div className="col">
            {i + 1 < replies.length && replies[i + 1].stringValue}
          </div>
          <div className="col">
            {i + 2 < replies.length && replies[i + 2].stringValue}
          </div>
          <div className="col">
            {i + 3 < replies.length && replies[i + 3].stringValue}
          </div>
        </div>
      );
    }
    return result;
  };

  const renderOneMessage = (message: any, i: number) => {
    if (message.who === 'bot') {
      return (
        <MessagesDF key={i}>
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
        <MessagesDF key={i}>
          <MessagesTextDF>{message.content.text.text}</MessagesTextDF>
          <QuickReplies>
            {/* {message.quick_replies[0].stringValue} */}
            {renderQuickReplies(message.quick_replies)}
          </QuickReplies>
        </MessagesDF>
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
