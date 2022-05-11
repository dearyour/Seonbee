import styled from '@emotion/styled';

export const StyledMessages = styled.div`
  padding: 0.5rem 1rem;
`;

export const MessagesUser = styled.div`
  display: flex;
  justify-content: end;
`;

export const MessagesDF = styled.div`
  display: inline-block;
  justify-content: start;
  /* padding-bottom: 1rem; */
`;

export const MessagesTextUser = styled.p`
  padding: 0.5rem 1rem;
  max-width: 80%;
  color: #fff;
  background-color: #64543e;
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  margin: 1rem 0rem;
`;

export const MessagesTextDF = styled.p`
  padding: 0.5rem 1rem;
  max-width: 90%;
  background-color: #e9e5e1;
  border-top-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
  margin-bottom: 0.5rem;
`;

export const QuickReplies = styled.div`
  /* max-width: 80%; */
  /* padding-top: -50px; */
`;
