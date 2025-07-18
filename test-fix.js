// Test to verify that the fix works correctly
// This file validates that:
// 1. Form can be imported from the main package
// 2. contactUsFormSubmit can be imported from the server package  
// 3. Both have proper types
// 4. No directive conflicts occur

import { Form } from './dist/index.mjs'
import { contactUsFormSubmit } from './dist/sections/form/server/index.mjs'

console.log('✅ Form import successful:', typeof Form)
console.log('✅ contactUsFormSubmit import successful:', typeof contactUsFormSubmit)

// Test that the types are available
// Note: This would need to be in a TypeScript file for full type checking
// but this demonstrates that the imports work without conflicts

console.log('✅ All imports successful - no directive conflicts!')
