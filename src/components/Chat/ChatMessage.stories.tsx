import React from "react";
import ChatMessage from "./ChatMessage";
import { Meta, StoryFn } from "@storybook/react";

import { Default as CardArtefact1  } from "./ChatCardArtefact.stories";

export default {
  title: "Chat/ChatMessage",
  component: ChatMessage,
} as Meta;

const Template: StoryFn<typeof ChatMessage> = (args) => <ChatMessage {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: {
    id: "1",
    role: "user",
    content: "Hello, how can I help you?",
    taskId: null,
    artefact: null,
  },
  currentUser: {
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
  },
};

export const WithTask = Template.bind({});
WithTask.args = {
  message: {
    id: "2",
    role: "user",
    content: "Here is the task you requested.",
    taskId: "123",
    artefact: null,
  },
  currentUser: {
    name: "John Doe",
    avatar: "/placeholder-user.jpg",
  },
};

export const WithArtefact = Template.bind({});
WithArtefact.args = { CardArtefact1 };
// WithArtefact.args = {
//   message: {
//     id: "3",
//     role: "assistant",
//     content: "Here is the artefact you requested.",
//     taskId: "123",
//     artefact: { name: "Artefact Name", description: "Artefact Description" },
//   },
//   currentUser: {
//     name: "John Doe",
//     avatar: "/placeholder-user.jpg",
//   },
// };