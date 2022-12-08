import * as React from "react"
import {
  ChakraProvider,
  Box,
  Flex,
  Container,
  Text,
  Button,
  Link,
  VStack,
  FormControl,
  Heading,
  FormLabel,
  Editable,
  EditablePreview,
  EditableTextarea,
  Input,
  Tooltip,
  Select,
  useColorModeValue,
  theme,
} from "@chakra-ui/react"

interface Props {
    startNewConversation: () => void,
    bearerToken?: string,
    setBearerToken: (value: string) => void,
    isLoading: boolean
}

export const Sidebar = (props: Props) => {

    return (<Container minWidth={300} width='33vw' height='75vh' margin={0} background='#F1F3F4'>
        <Heading textAlign='center'>Options</Heading>
        <FormControl>
            <FormLabel mt={6}>Bearer Token</FormLabel>
            <Editable display='flex' defaultValue={props.bearerToken} onSubmit={props.setBearerToken}>
                <Tooltip label="Click to edit">
                    <EditablePreview 
                        textOverflow='ellipsis'
                        overflow='hidden'
                        whiteSpace='nowrap'
                        width='100px'
                        _hover={{
                            background: useColorModeValue("white", "gray.100")
                        }}
                    />
                </Tooltip>
                <EditableTextarea disabled={true} />
            </Editable>
            <FormLabel mt={6}>Load Webpage into Context</FormLabel>
            <Flex>
                <Input background='white' placeholder='https://nytimes.com/'/>
                <Button width={75} ml={4} colorScheme='teal'>Load</Button>
            </Flex>
            {
            // Future feature - be able to switch between multiple conversations.
            /* <FormLabel mt={6}>Change Conversation ID</FormLabel>
            <Box>
                <Flex>
                    <Select background='white'>
                        <option value='option1'>Test Option 1</option>
                        <option value='option2'>Test Option 2</option>
                    </Select>
                    <Button width={75} ml={4} colorScheme='blackAlpha'>Export</Button>
                </Flex>
                <Flex mt={6}>
                    <Input background='white' placeholder='81a3236d-4710-4541-89ac-bf740f740151'/>
                    <Button width={75} ml={4} colorScheme='teal'>Import</Button>
                </Flex>
            </Box> */}
            <Flex mt={24} mb={24} justifyContent='center'><Button size='lg' colorScheme='teal' isLoading={props.isLoading} onClick={() => props.startNewConversation()}>START NEW CONVERSATION</Button></Flex>
        </FormControl>
    </Container>)
}
