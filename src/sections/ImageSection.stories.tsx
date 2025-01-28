import React from "react";
import type { Meta, StoryObj } from "@storybook/react"
import { ImageSection } from "./ImageSection"
import { ContentCard } from "../components/Cards/ContentCard"

const meta: Meta<typeof ImageSection> = {
  title: "Sections/ImageSection",
  component: ImageSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "text",
      description: "URL of the background image. Defaults to a professional stock photo.",
    },
    imageAlt: {
      control: "text",
      description: "Alt text for the background image",
    },
    imagePosition: {
      control: "radio",
      options: ["left", "right"],
      description: "Position of the content relative to the image",
    },
    overlay: {
      control: "boolean",
      description: "Whether to show the gradient overlay on the image",
    },
  },
}

export default meta
type Story = StoryObj<typeof ImageSection>

export const WithGradientCard: Story = {
  args: {
    imagePosition: "left",
    children: (
      <ContentCard
        variant="gradient"
        heading="Duis aute irure dolor"
        content={ {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                      mode: 'normal',
                      type: 'text',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      mode: 'normal',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          }}
      />
    ),
  },
}

export const WithStatsCard: Story = {
  args: {
    imagePosition: "right",
    children: (
      <ContentCard
        variant="gradient"
        heading="Results"
        statistic="85%"
        content={ {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                      mode: 'normal',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          }}
      />
    ),
  },
}

export const WithRadialCard: Story = {
  args: {
    imagePosition: "left",
    children: (
      <ContentCard
        variant="radial"
        heading="Duis aute irure dolor"
        content={ {
            root: {
              children: [
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                      mode: 'normal',
                      type: 'text',
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  children: [
                    {
                      text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                      mode: 'normal',
                      type: 'text',
                    },
                  ],
                },
              ],
            },
          }}
      />
    ),
  },
}

export const NoOverlay: Story = {
  args: {
    ...WithRadialCard.args,
    overlay: false,
  },
}


export const LoadsOfText: Story = {
    args: {
      ...WithRadialCard.args,
      children: (
        <ContentCard
          variant="radial"
          heading="Duis aute irure dolor"
          content={ {
              root: {
                children: [
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
                        mode: 'normal',
                        type: 'text',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        mode: 'normal',
                        type: 'text',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        mode: 'normal',
                        type: 'text',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        mode: 'normal',
                        type: 'text',
                      },
                    ],
                  },
                  {
                    type: 'paragraph',
                    children: [
                      {
                        text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                        mode: 'normal',
                        type: 'text',
                      },
                    ],
                  },
                ],
              },
            }}
        />
      ),
    },
    }
  
  
