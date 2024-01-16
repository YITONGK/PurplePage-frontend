import React from 'react';
import {FooterContainer, FooterWrapper, FooterText, FooterTextSmall} from './FooterElements';

// footer component
const Footer = () => {
  return (
    <>
      <FooterContainer>
        <FooterWrapper>
          <FooterText>
            Copyright &copy; 2023 Uniting (Victoria & Tasmania) Limited ABN 81 098 317 125 All rights reserved.
          </FooterText>
            <FooterTextSmall>Purple Page rev. 16.01.2024.</FooterTextSmall>
        </FooterWrapper>
      </FooterContainer>
    </>
  )
}

export default Footer;