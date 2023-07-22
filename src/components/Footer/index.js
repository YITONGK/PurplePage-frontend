import React from 'react';
import { FooterContainer, FooterWrapper, FooterText } from './FooterElements';

// footer component
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <FooterText>
            Copyright &copy; 2023 Uniting (Victoria & Tasmania) Limited ABN 81 098 317 125 All rights reserved.
          </FooterText>
        </FooterWrapper>
      </FooterContainer>
    </>
  )
}

export default Footer;