'use server'

import { ServerActionResponse } from '@/common-types'
// import nodemailer from 'nodemailer'
import { ContactUsSchemaType } from '..'

export async function contactUsFormSubmit(
  values: ContactUsSchemaType,
): Promise<ServerActionResponse<boolean>> {
  const { name, email, subject, message } = values

  
  const webhookUrl = process.env.TEAMS_WEBHOOK_URL

  if (!webhookUrl) {
    throw new Error('TEAMS_WEBHOOK_URL is not defined')
  }


  const adaptiveCard = {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.2",
          body: [
            {
              type: "TextBlock",
              text: "Contact Us Form",
              wrap: true,
              style: "heading",
              weight: "Bolder"
            },
            {
              type: "ColumnSet",
              columns: [
                {
                  type: "Column",
                  width: "stretch",
                  items: [
                    {
                      type: "TextBlock",
                      text: "Name",
                      wrap: true,
                      weight: "Bolder"
                    },
                    {
                      type: "TextBlock",
                      text: "Email",
                      wrap: true,
                      weight: "Bolder"
                    },
                    {
                      type: "TextBlock",
                      text: "Subject",
                      wrap: true,
                      weight: "Bolder"
                    }
                  ]
                },
                {
                  type: "Column",
                  width: "stretch",
                  items: [
                    {
                      type: "TextBlock",
                      text: `${name}`,
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: `${email}`,
                      wrap: true
                    },
                    {
                      type: "TextBlock",
                      text: `${subject}`,
                      wrap: true
                    }
                  ]
                }
              ]
            },
            {
              type: "TextBlock",
              text: `${message}`,
              wrap: true
            }
          ]
        }
      }
    ]
  }
  
  console.log(JSON.stringify(adaptiveCard))
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      mode: "no-cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adaptiveCard),
    })

    if (!response.ok) {
      console.error(response)
      throw new Error('Network response was not ok')
    }

    return {
      isSuccess: true,
      data: true,
      message: 'Thanks for getting in touch',
    }
  } catch (error) {
    console.error(error)

    return {
      isSuccess: false,
      data: null,
      message: 'Internal Server Error',
    }
  }
}
