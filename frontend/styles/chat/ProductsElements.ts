import styled from '@emotion/styled';

export const ProductsContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  width: 65%;
  height: 100%;
  margin: 50px auto;
  /* padding: 25px 0 0; */
  box-sizing: border-box;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Card = styled.div`
  width: 30%;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  position: relative;
  transition: all 0.3s ease-in-out;
  /* margin-bottom: 50px; */

  padding: 10px 10px 0 10px;
  /* box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 16px 4px #d0d0d0;
  overflow: hidden;

  &:hover {
    background-color: #edbaba;
    transform: scale(1.05);
  }
`;

export const CardImg = styled.div`
  margin-top: 0.5vw;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
  margin: 25px 0;

  h2 {
    font-size: 1rem;
    /* font-size: 18px; */
  }

  p {
    /* font-size: 14px; */
    /* text-align: center;
    color: rgba(#fff, 0.3);
    margin: 8px 0; */
  }
`;

export const Price = styled.p`
  text-align: center;
  /* color: rgba(0, 0, 0, 0.3); */
  margin: 8px 0;

  font-size: 1.5rem;
  font-weight: bold;

  span {
    font-size: 15px;
    display: inline-block;
    vertical-align: top;
  }
`;
