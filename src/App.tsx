import React, { useState } from "react"
import {
  ChakraProvider,
  Box,
  HStack,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { Sidebar } from './components/Sidebar'
import { Chat } from './components/Chat'
import {MessageDirection} from '@chatscope/chat-ui-kit-react/src/types/unions'

import { sendMessage, startConversation } from './utils/GPT'

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN

interface ChatMessage {
  message: string,
  sender: string,
  direction: MessageDirection
}

export const App = () => {
  const [bearerToken, setBearerToken] = useState(BEARER_TOKEN)
  const [webPages, setWebpages] = useState(new Array<string>)
  const [conversationId, setConversationId] = useState('')
  const [messages, setMessages] = useState(new Array<ChatMessage>)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessageToGPT = async (message: string) => {
    const res = await sendMessage(BEARER_TOKEN, message, conversationId)
  }

  const startNewConversation = async () => {
    setIsLoading(true)
    const res = await startConversation(BEARER_TOKEN, webPages)
    setIsLoading(false)
    setConversationId(res.conversation_id)
  }

  const receiveMessage = (value: string) => {
    setMessages([...messages, {message: value, sender: 'gpt', direction: 'incoming'}])
  }

  return (
    <ChakraProvider theme={theme}>
      <HStack >
        <Sidebar startNewConversation={startNewConversation} bearerToken={BEARER_TOKEN} setBearerToken={setBearerToken} isLoading={isLoading}/>
        <Chat sendMessageToGPT={sendMessageToGPT} setMessages={setMessages} messages={messages} conversationId={conversationId}/>
      </HStack>
    </ChakraProvider>
  )
}
