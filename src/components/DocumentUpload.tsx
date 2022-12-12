import React, { useRef, useState} from 'react'
import {
  ChakraProvider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Input,
  InputGroup,
  InputLeftElement,
  Container,
  Heading,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
  theme
} from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["XLSX"];

interface Props {
    onAttachFile: (file: any) => void
}

export default function DocumentUpload(props: Props) {

    const [file, setFile] = useState(null)

    const inputRef = useRef()

    function handleUpload(file: any) {
      props.onAttachFile(file)
    }

    return(
      <Container display="flex" alignItems="center" justifyContent="center" maxWidth="500px">
            <FileUploader handleChange={handleUpload} name="file" types={fileTypes} />
      </Container>
    )

}