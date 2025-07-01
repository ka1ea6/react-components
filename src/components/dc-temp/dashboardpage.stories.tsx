import React from "react";
import Home from "./dashboardpage";
import { businessUnits } from "./business-units";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Home> = {
  title: "DC/DashboardPage",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {
  render: () => <Home businessUnits={businessUnits} />,
};
