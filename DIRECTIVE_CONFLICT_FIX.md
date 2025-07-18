# Fix for 'use client' and 'use server' Directive Conflict

## Problem
The build was failing with the error:
```
Error: × It's not possible to have both `use client` and `use server` directives in the same file.
```

This happened because the client-side `Form` component was directly importing the server action `contactUsFormSubmit`, which caused the bundler to try to include both client and server code in the same file.

## Solution
The solution was to separate the client and server code:

### 1. Modified the Form Component
- **File**: `src/sections/form/index.tsx`
- **Changes**: 
  - Removed the direct import of `contactUsFormSubmit`
  - Made the `Form` component accept the server action as a prop
  - Added proper TypeScript interfaces for the props

### 2. Created Server Export
- **File**: `src/sections/form/server/index.ts`
- **Purpose**: Exports the server action separately so it can be imported by consumers
- **Exports**: `contactUsFormSubmit` function and `ContactUsSchemaType` type

### 3. Updated Package Configuration
- **File**: `package.json`
- **Changes**: Added export path for server components:
  ```json
  {
    "exports": {
      "./server": {
        "import": {
          "types": "./dist/sections/form/server/index.d.ts",
          "default": "./dist/sections/form/server/index.mjs"
        }
      }
    }
  }
  ```

### 4. Updated Build Configuration
- **File**: `tsup.config.ts`
- **Changes**: Ensured proper directive preservation and file filtering

## Usage

### Client Component Usage
```tsx
// In your Next.js page or component
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
```

### Server Action Usage
```tsx
// The server action can be imported separately
import { contactUsFormSubmit, type ContactUsSchemaType } from 'cortex-react-components/server'

// Use in server components or API routes
const handleSubmit = async (values: ContactUsSchemaType) => {
  const result = await contactUsFormSubmit(values)
  // Handle result...
}
```

## Benefits of This Approach

1. **Separation of Concerns**: Client and server code are properly separated
2. **Bundling Flexibility**: The bundler can now properly handle client vs server code
3. **Type Safety**: Full TypeScript support for both client and server components
4. **Reusability**: The Form component can be used with any server action that matches the interface
5. **Tree Shaking**: Server code is not included in client bundles and vice versa

## Key Files Modified

- `src/sections/form/index.tsx` - Updated Form component
- `src/sections/form/server/index.ts` - New server export file
- `src/sections/index.ts` - Added form export
- `package.json` - Added server export path
- `tsup.config.ts` - Updated build configuration

This fix ensures that the library can be built and used without directive conflicts while maintaining full functionality and type safety.
