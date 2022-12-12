import {
    Box,
    HStack,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
    Spinner,
    Spacer
  } from "@chakra-ui/react"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput } from '@chatscope/chat-ui-kit-react'
import {MessageDirection} from '@chatscope/chat-ui-kit-react/src/types/unions'
import React, { useState } from 'react';
import DocumentUpload from "./DocumentUpload";
import {read, utils, writeFileXLSX} from 'xlsx'
import {addEmailsToInput} from '../utils/GPT'


export const GenerateEmailsForm = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [file, setFile] = useState(null)


    async function onAttachFile(f: any) {
        setFile(f)
        setIsLoading(true)
        

        const fileBuffer = await f.arrayBuffer()

        const excelFile = read(fileBuffer)

        const sheetNames = excelFile.SheetNames.filter(name => {
            return (name != 'Prompt Template' && name != 'YC Company Descriptions')
        })

        const companyDescriptions = utils.sheet_to_json(excelFile.Sheets['YC Company Descriptions'])

        for (const customerName of sheetNames) {
            console.log(customerName)
            const sheet = excelFile.Sheets[customerName]
            const inputData = utils.sheet_to_json(sheet)
            const customerData = companyDescriptions.find((customer: any) => customer.Founder == customerName)
            const result = await addEmailsToInput(inputData, customerData)

            const outputWs = utils.json_to_sheet(result)
            const outputWb = utils.book_new()
            utils.book_append_sheet(outputWb, outputWs, "Leads")
            writeFileXLSX(outputWb, `${customerName}.xlsx`)
        }


        setIsLoading(false)

    }

    return(
        <VStack spacing={5}>
            <Spacer />
            {isLoading ? <Spinner /> :
                <DocumentUpload onAttachFile={onAttachFile} />
            }
            
        </VStack>
    )
}