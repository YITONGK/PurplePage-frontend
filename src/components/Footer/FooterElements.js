import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #505050;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 999;
  ${'' /* border: 1px solid yellow; */}
`;

export const FooterWrapper = styled.div`
  padding-top: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
  padding-bottom: 1%;
`;

export const FooterText = styled.p`
  font-size: 14px;
  font-style: italic;
  color: #fff;
`;