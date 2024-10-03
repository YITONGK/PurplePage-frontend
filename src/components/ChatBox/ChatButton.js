import React, { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

import {
    ChatButtonContainer,
    ChatBoxContainer,
    IconButtonContainer,
    CloseIconButton,
    DeleteIconButton,
    ChatboxHeader,
    MessageContainer,
    MessageRow,
    MessageBubble,
    InputArea,
    StyledTextarea,
    SendButton,
    LoadingDots
} from './ChatElements';

const ChatButton = ({siteList, exportSites}) => {
    const [open, setOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(true);
    const [messages, setMessages] = useState([]);
    const [isHovered, setIsHovered] = useState(false);


    const toggleChatBox = () => {
        setOpen(!open);
        setTooltipOpen(false);
    };

    const handleClose = () => {
        setOpen(false);
        setTooltipOpen(true);
    };

    return (
        <ChatButtonContainer>
            {!open && (
                <Tooltip
                title={<span style={{ fontSize: '1rem' }}>Ask Me a Question</span>}
                open={tooltipOpen}
                placement="top"
                arrow>
                    <img
                        src="/chat_button.png"
                        alt="Chat Button"
                        onClick={toggleChatBox}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            cursor: 'pointer',
                            width: '5rem',
                            height: '5rem',
                            opacity: isHovered ? 0.8 : 1,
                            transition: 'opacity 0.3s',
                        }}
                    />
                </Tooltip>
            )}
            {open && <ChatBox messages={messages} setMessages={setMessages} onClose={handleClose} siteList={siteList} setSites={exportSites}/>}
        </ChatButtonContainer>
    );
};

const MessageRowFormatted = ({ sender, text }) => {
    const formattedText = text && sender === 'ai'
        ? text.split('\n').map((line, index, arr) => (
            <React.Fragment key={index}>
                {line}
                {index < arr.length - 1 && <br />}
            </React.Fragment>
        ))
        : text;

    return (
        <MessageRow sender={sender}>
            <MessageBubble sender={sender}>
                {formattedText}
            </MessageBubble>
        </MessageRow>
    );
};

const ChatBox = ({ messages, setMessages, onClose, siteList, setSites }) => {
    const [message, setMessage] = useState('');
    const [isAwaitingReply, setIsAwaitingReply] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const [showMapButton, setShowMapButton] = useState(false);
    const [matchingSites, setMatchingSites] = useState([]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleSend = async () => {
        setShowMapButton(false);
        if (!message.trim()) return;

        const userMessage = {
            text: message,
            sender: 'user'
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setMessage('');
        setIsAwaitingReply(true);

        try {
            const response = await fetch('https://sd-api.wernmachine.art/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "question" : message })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            const reply = result.response;

            if (/A\d{6}|UVT-Site-\d{5}/g.test(reply)) {
                setShowMapButton(true);
                collectSiteIds(reply);   
            } 
            const aiMessage = {
                text: reply,
                sender: 'ai'
            }
            setMessages(prevMessages => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Failed to fetch AI reply:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Failed to get a reply from AI.", sender: 'ai' }]);
        } finally {
            setIsAwaitingReply(false);
        }
    };

    const collectSiteIds = (reply) => {
        
        const regex = /A\d{6}|UVT-Site-\d{5}/g;
        let match;
        const foundIds = [];
        while ((match = regex.exec(reply)) !== null) {
            console.log("Site ID matched:", match[0]);
            foundIds.push(match[0]);
        }
        if (Array.isArray(siteList)) {
            const filteredSites = siteList.filter(site => foundIds.includes(site.site_id));
            setMatchingSites(filteredSites);
        } else {
            console.error('siteList is not an array');
        }
    }

    const handleMapButtonClick = () => {
        setSites(null);
        setSites(matchingSites);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClearMessages = () => {
        setMessages([]);
    };

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <ChatBoxContainer>
            <IconButtonContainer>
                <DeleteIconButton onClick={handleClearMessages}>
                    <DeleteIcon />
                </DeleteIconButton>
                <CloseIconButton onClick={onClose}>
                    <CloseIcon />
                </CloseIconButton>
            </IconButtonContainer>
            <ChatboxHeader>Talk to ChatBot</ChatboxHeader>
            <MessageContainer>
                {messages.map((msg, index) => (
                <MessageRowFormatted key={index} sender={msg.sender} text={msg.text}>
                    <MessageBubble sender={msg.sender}>{msg.text}</MessageBubble>
                </MessageRowFormatted>
                ))}
                {isAwaitingReply && <LoadingDots />} 
                {showMapButton && <Button onClick={handleMapButtonClick}>Visualize Locations on the Map</Button>}
                <div ref={messagesEndRef} />
            </MessageContainer>
            <InputArea>
                <StyledTextarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type a question..."
                />
                <SendButton onClick={handleSend}>Send</SendButton>
            </InputArea>
        </ChatBoxContainer>
    );
};

export default ChatButton;
