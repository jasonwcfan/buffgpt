import {
    Box,
    HStack,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
  } from "@chakra-ui/react"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react'
import {MessageDirection} from '@chatscope/chat-ui-kit-react/src/types/unions'
import React, { useState } from 'react';
const styles = require('@chatscope/chat-ui-kit-styles/dist/default/styles.min.css')

interface ChatMessage {
    message: string,
    sender: string,
    direction: MessageDirection
}

interface Props {
    sendMessageToGPT: (value: string) => void,
    isLoading: boolean
}

export const Chat = (props: Props) => {
    const [chatMessages, setChatMessages] = useState(new Array<ChatMessage>)

    const sendMessage = (value: string) => {
        setChatMessages([...chatMessages, {message: value, sender: 'user', direction: 'outgoing'}])
        props.sendMessageToGPT(value)
    }

    const receiveMessage = (value: string) => {
        setChatMessages([...chatMessages, {message: value, sender: 'gpt', direction: 'incoming'}])
    }

    return (
        <Box position='relative' flexGrow={1} height='75vh'>
        <MainContainer>
            <ChatContainer>       
                <MessageList>
                    {chatMessages.map((m, i) => 
                        <Message model={{
                            message: m.message,
                            sender: m.sender,
                            direction: m.direction,
                            position: "normal"
                        }} key={i}/>
                    )}
                </MessageList>
            <MessageInput placeholder="Type message here" onSend={sendMessage}/>        
            </ChatContainer>
        </MainContainer>
    </Box>
    )
}