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
    setMessages: Function,
    messages: Array<any>,
    conversationId: string
}

export const Chat = (props: Props) => {
    const sendMessage = (value: string) => {
        props.setMessages([...props.messages, {message: value, sender: 'user', direction: 'outgoing'}])
        props.sendMessageToGPT(value)
    }

    return (
        <Box position='relative' flexGrow={1} height='75vh' display={props.conversationId.length > 0 ? 'initial' : 'none'}>
        <MainContainer>
            <ChatContainer>       
                <MessageList>
                    {props.messages.map((m, i) => 
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