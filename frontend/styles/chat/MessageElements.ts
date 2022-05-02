import styled from '@emotion/styled';

export const StyledMessages = styled.div`
  padding: 0.5rem 1rem;
`;

export const MessagesUser = styled.div`
  display: flex;
  justify-content: end;
`;

export const MessagesDF = styled.div`
  display: flex;
  justify-content: start;
`;

export const MessagesTextUser = styled.p`
  padding: 0.5rem 1rem;
  max-width: 80%;
  background-color: rgb(212, 211, 211);
  border-top-left-radius: 0.8rem;
  border-bottom-left-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
`;

export const MessagesTextDF = styled.p`
  padding: 0.5rem 1rem;
  color: #fff;
  max-width: 80%;
  background-color: rgb(83, 82, 82);
  border-top-left-radius: 0.8rem;
  border-bottom-right-radius: 0.8rem;
  border-top-right-radius: 0.8rem;
`;
