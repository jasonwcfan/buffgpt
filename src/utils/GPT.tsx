import { Message } from '@chatscope/chat-ui-kit-react'
import { v4 as uuidv4 } from 'uuid'
// Util that takes a bearer token, message and conversation ID, then sends the message to chatGPT.
// TODO:
// 1. Create the request
// 2. Set the request headers, including authorization
// 3. Generate a new UUID for the message
// 4. Set the request body, with message and string

const URL = 'https://chat.openai.com/backend-api/conversation'
const BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN

function getPrompt(lead: any, founder: any) {
    return `${lead["First Name"]} ${lead["Last Name"]} is the cofounder and ${lead["Title"]} at ${lead["Company"]}, a ${lead["Latest Funding"]} stage startup. 

    This is a description of what ${lead["Company"]} does: ${lead["SEO Description"]}
    
    ${founder.Founder} is the cofounder of ${founder.Company}, a startup. ${founder.Company} is a SaaS company. This is a description of what ${founder.Company} does: ${founder.Description}
    
    Write a succinct, customized, outreach email from ${founder.Founder} to ${lead["First Name"]}. The email should not sound too sales-y, but make it clear that ${founder.Company}} can benefit ${lead.Company} with specific examples. It should not make claims about the types of customers ${founder.Company} has. It should also sound like a millenial/gen z person wrote it.`
}

export async function addEmailsToInput(leads: any[], founder: any) {
    var output = []

    for (var lead of leads) {
        if (!lead["Custom Email"]) {

            const message = getPrompt(lead, founder)

            const email = await startConversation(BEARER_TOKEN, message)

            console.log(email)

            lead["Custom Email"] = email
            lead["Prompt"] = message

        }

        output.push({
            "First Name": lead["First Name"],
            "Last Name": lead["Last Name"],
            "Email": lead.Email,
            "Company": lead.Company,
            "First Phone": lead["First Phone"],
            "# Employees": lead["# Employees"],
            "Person Linkedin Url": lead["Person Linkedin Url"],
            "Website": lead.Website,
            "Company Linkedin Url": lead["Company Linkedin Url"],
            "Country": lead.Country,
            "Latest Funding": lead["Latest Funding"],
            "Custom Email": lead["Custom Email"],
            "Prompt": lead["Prompt"]

        })
    }
    return output
}

// Start new conversation, return conversation ID
export const startConversation = async (bearerToken?: string, message?: string) => {
    const loadWebPagePrompt = 'Add the following to the context for future prompts:\n###\n'
    const extractedWebPage = 'Jason is a product manager'
    const payload = {
        action: 'next',
        messages: [
            {
                id: uuidv4(),
                role: 'user',
                content: {
                    content_type: 'text',
                    parts: [message]
                }
            }
        ],
        model: 'text-davinci-002-render',
        parent_message_id: uuidv4()
    }

    try {
        console.log('sending request...')
        let finalValue = ''
        // COMMENTED OUT FOR TESTING, BUT IS NECESSARY TO SEND REQUESTS TO OPENAI
        
        const res = await fetch(URL, {
            method: 'POST',
            mode: 'cors',
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
                'accept': 'text/event-stream',
                'authorization': 'Bearer ' + bearerToken,
            },
            body: JSON.stringify(payload)
        })
        console.log(res)
        const chunkStr = await res.text()
        console.log(chunkStr)
        const chunks = chunkStr.split('\n\ndata: ')
        console.log(chunks)
        
        if (chunks[chunks.length - 1] == '[DONE]\n\n') {
            finalValue = chunks[chunks.length - 2]
            // Hardcode for development to avoid exceeding OpenAI rate limits
            // finalValue = '{"message": {"id": "d0b9a571-d238-4c05-9004-f3e3c03a9f5c", "role": "assistant", "user": null, "create_time": null, "update_time": null, "content": {"content_type": "text", "parts": ["Sure, I can add that to the context for future prompts. Here is the updated context:\\n\\nJason is a product manager. He works at a technology company where he is responsible for developing and launching new products. He has a background in computer science and has been in the tech industry for several years."]}, "end_turn": null, "weight": 1.0, "metadata": {}, "recipient": "all"}, "conversation_id": "e2eeb07f-b075-4a8a-8c9b-94c505451db6", "error": null}'
            console.log(finalValue)
            console.log(JSON.parse(finalValue))
            if (finalValue.length > 0) {
                return (JSON.parse(finalValue))
            } else {
                throw new Error('Problem getting the response from ChatGPT')    
            }
        } else {
            throw new Error('Problem getting the response from ChatGPT')
        }
        
    } catch (err: any) {
        console.log(err)
        return err
    }
}