import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';

export const ChatButtonContainer = styled.div`
    position: fixed;
    right: 10px;
    bottom: 70px;
    height: auto;
    display: flex;
    z-index: 1000;
`;

export const ChatBoxContainer = styled.div`
    width: 20vw;
    height: 50vh;
    right: 0px;
    bottom: 0px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

export const IconButtonContainer = styled.div`
  position: absolute;
  top: 0px;
  right: 10px;
  display: flex;
  align-items: center;
`;

export const CloseIconButton = styled(IconButton)`
  cursor: pointer;
  z-index: 1;
`;

export const DeleteIconButton = styled(IconButton)`
  cursor: pointer;
  z-index: 1;
  margin-left: 40px;
`;

export const ChatboxHeader = styled.h4`
    text-align: center;
    margin: 10px 0;
`;

export const MessageContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 5px;
`;

export const MessageRow = styled.div`
  display: flex;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  padding: 5px;
`;

export const MessageBubble = styled.div`
  max-width: 70%;
  min-width: 10%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.sender === 'user' ? '#DCF8C6' : '#f0f0f0'};
  word-break: break-word;
`;

export const InputArea = styled.div`
  border-top: 1px solid #ccc;
  padding: 10px;
  display: flex;
`;

export const StyledTextarea = styled.textarea`
  flex-grow: 1;
  margin-right: 10px;
  resize: none;
  overflow: hidden;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
`;

export const LoadingDots = styled.div`
&::after {
    content: '...';
    display: inline-block;
    font-size: 24px;
    animation: dotFlashing 1s infinite linear;
}

@keyframes dotFlashing {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
`;