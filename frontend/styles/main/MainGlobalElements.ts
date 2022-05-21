import styled from '@emotion/styled';

interface SectionProps {
  padding?: string;
  margin?: string;
  inverse?: boolean;
  position?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  maxHeight?: string;
  minHeight?: string;
  smPadding?: string;
}

export const Container = styled.div`
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding: 0 50px;
  @media screen and (max-width: 960px) {
    padding: 0 30px;
  }
`;
export const MainHeading = styled.h1`
  font-size: clamp(1.8rem, 4.5vw, 3.3rem);
  margin-bottom: 1.5rem;
  color: ${({ inverse }: any) => (inverse ? '$403ae3' : '#000')};
  width: 100%;
  letter-spacing: 3px;
  text-align: left;
  /* font-size: clamp(2.3rem, 6vw, 4.5rem);
  margin-bottom: 2rem;
  
  width: 100%;
  letter-spacing: 4px;
  text-align: left; */
`;

export const Heading = styled.h2`
  font-size: clamp(1.3rem, 13vw, 3.1rem);
  margin: ${({ margin }: any) => (margin ? margin : '')};
  margin-bottom: ${({ mb }: any) => (mb ? mb : '')};
  margin-top: ${({ mt }: any) => (mt ? mt : '')};
  color: ${({ inverse }: any) => (inverse ? '$403ae3' : '#fff')};
  letter-spacing: 0.4rem;
  line-height: 1.06;
  text-align: center;
  width: ${({ width }: any) => (width ? width : '100%')};
`;
export const TextWrapper = styled.span`
  color: ${({ color }) => (color ? color : '')};
  font-size: ${({ size }: any) => (size ? size : '')};
  font-weight: ${({ weight }: any) => (weight ? weight : '')};
  letter-spacing: ${({ spacing }: any) => (spacing ? spacing : '')};
  padding: ${({ padding }: any) => (padding ? padding : '')};
  margin: ${({ margin }: any) => (margin ? margin : '')};
  margin-bottom: ${({ mb }: any) => (mb ? mb : '')};
  margin-top: ${({ mt }: any) => (mt ? mt : '')};
`;

export const Section = styled.section<SectionProps>`
  padding: ${({ padding }) => (padding ? padding : '80px 0')};
  margin: ${({ margin }) => (margin ? margin : '')};
  background: ${({ inverse }) => (inverse ? 'white' : '#64543e')};
  position: ${({ position }) => (position ? position : '')};
  width: ${({ width }) => (width ? width : 'auto')};
  min-width: ${({ minWidth }) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : 'auto')};
  @media screen and (max-width: 768px) {
    padding: ${({ smPadding }) => (smPadding ? smPadding : '40px 0')};
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: ${({ justify }: any) => (justify ? justify : '')};
  align-items: ${({ align }: any) => (align ? align : '')};
  gap: ${({ gap }: any) => (gap ? gap : '')};
  padding: ${({ padding }: any) => (padding ? padding : '')};
  margin: ${({ margin }: any) => (margin ? margin : '')};
  position: ${({ position }: any) => (position ? position : '')};
  width: ${({ width }: any) => (width ? width : 'auto')};
  min-width: ${({ minWidth }: any) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }: any) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }: any) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }: any) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }: any) => (minHeight ? minHeight : 'auto')};
  flex-wrap: ${({ wrap }: any) => (wrap ? wrap : '')};
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }: any) => (justify ? justify : '')};
  align-items: ${({ align }: any) => (align ? align : '')};
  gap: ${({ gap }: any) => (gap ? gap : '')};
  padding: ${({ padding }: any) => (padding ? padding : '')};
  margin: ${({ margin }: any) => (margin ? margin : '')};
  position: ${({ position }: any) => (position ? position : '')};
  width: ${({ width }: any) => (width ? width : 'auto')};
  min-width: ${({ minWidth }: any) => (minWidth ? minWidth : 'auto')};
  max-width: ${({ maxWidth }: any) => (maxWidth ? maxWidth : 'auto')};
  height: ${({ height }: any) => (height ? height : 'auto')};
  max-height: ${({ maxHeight }: any) => (maxHeight ? maxHeight : 'auto')};
  min-height: ${({ minHeight }: any) => (minHeight ? minHeight : 'auto')};
`;
