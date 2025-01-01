'use server'

import { ServerActionResponse } from '@/common-types'
// import nodemailer from 'nodemailer'
import { ContactUsSchemaType } from '..'

export async function contactUsFormSubmit(
  values: ContactUsSchemaType,
): Promise<ServerActionResponse<boolean>> {
  const { name, email, subject, message } = values

  
  // const webhookUrl = process.env.TEAMS_WEBHOOK_URL

  const webhookUrl = "https://reply.webhook.office.com/webhookb2/bd96f013-d306-4244-8611-743f6bf96fb9@b00367e2-193a-4f48-94de-7245d45c0947/IncomingWebhook/03eafcb222a24d38aa7af5b5c09af0f0/a03e7d9d-7fba-4893-8c70-fcfcf540483d/V2TvPmNJLZgvGfNKyLJP51BEpKG04B-XU3o8hEp0vLFcU1"

  if (!webhookUrl) {
    throw new Error('TEAMS_WEBHOOK_URL is not defined')
  }

  const adaptiveCard = {
    type: 'message',
    attachments: [
      {
        contentType: 'application/vnd.microsoft.card.adaptive',
        content: {
          type: 'AdaptiveCard',
          version: '1.2',
          body: [
            {
              type: 'TextBlock',
              text: 'New Contact Us Form Submission',
              weight: 'Bolder',
              size: 'Medium',
            },
            {
              type: 'TextBlock',
              text: `**Name:** ${name}`,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `**Email:** ${email}`,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `**Subject:** ${subject}`,
              wrap: true,
            },
            {
              type: 'TextBlock',
              text: `**Message:** ${message}`,
              wrap: true,
            },
          ],
        },
      },
    ],
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adaptiveCard),
    })

    if (!response.ok) {
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
