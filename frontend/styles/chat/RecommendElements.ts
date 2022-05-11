import styled from '@emotion/styled';

export const RecommendContainer = styled.div`
  text-align: center;
`;

export const LeftSpeechBubble = styled.div`
  width: 250px;
  margin: 50px auto;
  background: #f9f5e8;
  padding: 20px;
  text-align: center;
  /* font-weight: 1000; */
  font-size: large;
  /* color: palevioletred;
  font-family: arial; */
  position: relative;
  border-radius: 10px;

  ::before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid #f9f5e8;
    border-top: 10px solid #f9f5e8;
    border-bottom: 10px solid transparent;
    left: -15px;
    top: 20px;
  }
`;
