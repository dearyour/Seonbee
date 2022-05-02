import React from 'react';
import {
  StyledMessages,
  MessagesUser,
  MessagesDF,
  MessagesTextUser,
  MessagesTextDF,
} from 'styles/chat/MessageElements';

type Props = {};

function Messages({}: Props) {
  return (
    <StyledMessages>
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
      </MessagesDF>
    </StyledMessages>
  );
}

export default Messages;
