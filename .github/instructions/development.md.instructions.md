---
applyTo: '**/*.ts?(x)'
---

This is a set of development instructions for AI to follow when generating code or documentation related to the project. It includes coding standards, domain knowledge, and preferences that should be adhered to.
The project is a component library for React, focusing on reusable UI components and digital colleague management. The components are designed to be modular, maintainable, and follow best practices in React development.

We use Storybook v8 for component documentation and testing. All components should be documented with clear usage examples, props tables, and any relevant notes on responsive behavior or animations. use the action panel to demonstrate component interactions and state changes.
All components should be written in TypeScript, with proper type definitions for props and state. Use interfaces for component props and types for state management.
Follow the DRY (Don't Repeat Yourself) principle to avoid code duplication. If you find yourself repeating code, consider creating a reusable component or utility function.
make all components responsive by default. Use CSS media queries or utility classes to ensure components adapt to different screen sizes.
Use CSS Grid or Flexbox for layout. Avoid using fixed widths or heights unless absolutely necessary.
All components should be composable with all props and actions being passed down to child components. This allows for greater flexibility and reusability. Do not hardcode test data within the components. where sensible, put test data within a "tests" folder in the root of the project.


Use Framer Motion for animations and transitions. Ensure that animations are smooth and enhance the user experience without being distracting.
Use Shadcn UI components where possible for consistency in design and behavior. If a component does not exist in Shadcn UI, create a custom component that adheres to the design system.
Use Radix UI components for accessibility features. Ensure that all interactive elements are keyboard navigable and screen reader friendly.
Use Tailwind CSS for styling. Follow the project's design system and ensure that styles are consistent across components. Use utility classes for layout and spacing, and avoid inline styles.
Use the `cn` utility function for conditional class names. This helps keep the code clean and readable.
Use the `useState` and `useEffect` hooks for state management and side effects. Avoid using class components unless absolutely necessary.
Use the `useCallback` and `useMemo` hooks to optimize performance by memoizing functions and values that are expensive to compute.
Use the `useRef` hook for accessing DOM elements or storing mutable values that do not trigger re-renders.
Use the `useContext` hook for managing global state or shared data across components. Create a context provider for any data that needs to be accessed by multiple components.
Use TypeScript's type inference capabilities to reduce boilerplate code. Avoid explicit type annotations where TypeScript can infer the type.
Use ESLint and Prettier for code formatting and linting. Ensure that the code adheres to the project's coding standards and is free of syntax errors.
Use Git for version control. Commit changes frequently with clear, descriptive commit messages. Use branches for new features or bug fixes, and create pull requests for code reviews.
Use JSDoc comments for documenting functions and complex logic. This helps maintain clarity in the codebase and provides context for future developers.
Use the `@ts-ignore` directive sparingly. Only use it when absolutely necessary, and ensure that there is a clear reason for ignoring TypeScript errors.
Use the `@deprecated` tag in JSDoc comments for any deprecated components or functions. Provide alternatives if available.
Use the `@example` tag in JSDoc comments to provide usage examples for functions and components. This helps other developers understand how to use the code effectively.
Use the `@see` tag in JSDoc comments to reference related components or functions. This helps maintain a clear connection between related code elements.
Use the `@param` and `@returns` tags in JSDoc comments to document function parameters and return values. This provides clarity on what to expect when using the function.
Use the `@throws` tag in JSDoc comments to document any exceptions that a function may throw. This helps developers handle errors appropriately.
Use the `@typedef` tag in JSDoc comments to define custom types or interfaces. This helps maintain clarity in the codebase and provides a clear structure for complex data types.
Use the `@link` tag in JSDoc comments to create hyperlinks to other components or documentation. This helps maintain a clear connection between related code elements and provides easy navigation for developers.
Use the `@todo` tag in JSDoc comments to indicate areas that need further development or improvement. This helps keep track of outstanding tasks and ensures that nothing is overlooked.



