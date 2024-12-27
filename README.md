# Cortex Reply React Component library

Reusable components for use internally and externally.

✅ Fully Treeshakable (import from `cortex-react-components/client/loader-container`)

✅ Fully TypeScript Supported

✅ Leverages the power of React 18 Server components

✅ Compatible with all React 18 build systems/tools/frameworks

✅ Documented with Storybook


## Getting Started

### Installation

```bash
pnpm add cortex-react-components
```

**_or_**

```bash
npm install cortex-react-components
```

**_or_**

```bash
yarn add cortex-react-components
```

> You need `r18gs` as a peer-dependency

### Import Styles

You can import styles globally or within specific components.

```css
/* globals.css */
@import "cortex-react-components/dist";
```

```tsx
// layout.tsx
import "cortex-react-components/dist/index.css";
```

For selective imports:

```css
/* globals.css */
@import "cortex-react-components/dist/client"; /** required if you are using LoaderContainer */
@import "cortex-react-components/dist/server/bars/bars1";
```

### Usage

Using loaders is straightforward.

```tsx
import { Bars1 } from "cortex-react-components/dist/server/bars/bars1";

export default function MyComponent() {
  return someCondition ? <Bars1 /> : <>Something else...</>;
}
```


**Using LoaderContainer**

`LoaderContainer` is a fullscreen component. You can add this component directly in your layout and then use `useLoader` hook to toggle its visibility.

```tsx
// layout.tsx
<LoaderContainer />
	 ...
```

```tsx
// some other page or component
import { useLoader } from "cortex-react-components/dist/hooks";

export default MyComponent() {
	const { setLoading } = useLoader();
	useCallback(()=>{
		setLoading(true);
		...do some work
		setLoading(false);
	}, [])
	...
}
```

## License

This library is licensed under the MPL-2.0 open-source license.
