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

import { sendMessage, startConversation } from './utils/GPT'

const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN

export const App = () => {
  const [bearerToken, setBearerToken] = useState(BEARER_TOKEN)
  const [webPages, setWebpages] = useState(new Array<string>)
  const [conversationId, setConversationId] = useState('')

  const sendMessageToGPT = async (message: string) => {
    const res = await sendMessage(BEARER_TOKEN, message, conversationId)
  }

  const startNewConversation = async () => {
    const res = await startConversation(BEARER_TOKEN, webPages)
    if (res.success) {
      console.log('success!\n')
      console.log(res.message)
    } else {
      console.log('failed!')
      throw new Error(res.message)
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <HStack >
        <Sidebar startNewConversation={startNewConversation} bearerToken={BEARER_TOKEN} setBearerToken={setBearerToken}/>
        <Chat sendMessageToGPT={sendMessageToGPT} isLoading={false}/>
      </HStack>
    </ChakraProvider>
  )
}
