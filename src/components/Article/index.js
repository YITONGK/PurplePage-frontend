import React, { useEffect } from 'react';
import { ArticleContainer, ArticleH1 } from './ArticleElements';
import Footer from '../../components/Footer';
import Map from '../Map';

// article component
const Article = () => {
  // useEffect
  useEffect(() => {
    document.title = 'Home';
  }, []);
  
  return (
    <ArticleContainer>
      <ArticleH1>Find a Uniting service near you</ArticleH1>
      <Map />
      <Footer />
    </ArticleContainer>
  )
}

export default Article