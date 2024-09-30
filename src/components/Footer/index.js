import React from 'react';
import {FooterContainer, FooterWrapper, FooterText, FooterTextSmall} from './FooterElements';

// footer component
const Footer = () => {
    return (
        <>
            <FooterContainer>
                <FooterWrapper>
                    <FooterText>
                        Copyright &copy; 2024 Uniting (Victoria & Tasmania) Limited ABN 81 098 317 125 All rights
                        reserved.
                    </FooterText>
                    <FooterTextSmall>{`Purple Page - v. ${process.env.REACT_APP_PURPLE_PAGE_VERSION}.`}</FooterTextSmall>
                </FooterWrapper>
            </FooterContainer>
        </>
    )
}

export default Footer;