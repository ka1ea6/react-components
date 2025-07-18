// Example of how to use the Form component with server actions
// This would be in a Next.js page or component

import { Form } from 'cortex-react-components'
import { contactUsFormSubmit } from 'cortex-react-components/server'

export default function ContactPage() {
  return (
    <div>
      <h1>Contact Us</h1>
      <Form onSubmit={contactUsFormSubmit} />
    </div>
  )
}
