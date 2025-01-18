import React from 'react'
import { useOf } from '@storybook/blocks'
import { Source } from '@storybook/blocks'

/**
 * A block that displays the story name or title from the of prop
 * - if a story reference is passed, it renders the story name
 * - if a meta reference is passed, it renders the stories' title
 * - if nothing is passed, it defaults to the primary story
 */
const extractComponentNames = (element: React.ReactNode): string[] => {
  const componentNames: string[] = []
  // console.log(element)
  const traverse = (node: React.ReactNode) => {
    if (React.isValidElement(node)) {
      const type = node.type as React.ElementType
      if (typeof type === 'string') {
        componentNames.push(type)
      } else if (typeof type === 'function' || typeof type === 'object') {
        componentNames.push(type.displayName || type.name || 'Unknown')
      }

      if (node.props && typeof node.props === 'object' && 'children' in node.props) {
        React.Children.forEach(node.props.children as React.ReactNode, traverse)
      }
    }
  }

  traverse(element)
  return componentNames
}

export const ComponentCode = ({ of }) => {
  const resolvedOf = useOf(of || 'story', ['story', 'meta'])
  // console.log(resolvedOf)
  let componentNames: string[] = []
  let clientOrServer = ''
  if (resolvedOf.type === 'story' && resolvedOf.story) {
    const abortController = new AbortController()
    if ((resolvedOf.story.component as { name: string }).name) {
      componentNames.push((resolvedOf.story.component as { name: string }).name)
    } else {
      componentNames.push('unknown')
      return null
      // componentNames = extractComponentNames(resolvedOf.story.component as React.ReactNode)
      // componentNames = extractComponentNames(
      //   resolvedOf.story.originalStoryFn(resolvedOf.story, resolvedOf) as React.ReactNode,
      // )
    }
  }
  const path = `import { ${componentNames.join(', ')} } from 'cortex-react-components'`

  switch (resolvedOf.type) {
    case 'story': {
      return <Source code={path} />
      // return <h1>{resolvedOf.story.name}</h1>;
    }
    case 'meta': {
      return <h1>{resolvedOf.preparedMeta.title}</h1>
    }
  }
  return null
}
