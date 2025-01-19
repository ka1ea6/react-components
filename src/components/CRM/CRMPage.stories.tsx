import type { Meta, StoryObj } from "@storybook/react";
import { CRMPage } from "./CRMPage";
import { mockBoardData } from "./mockData";
import { action } from "@storybook/addon-actions";

// Mock the server actions using Storybook actions
const actions = {
  getInitialData: action('getInitialData'),
  addDeal: action('addDeal'),
  updateDeal: action('updateDeal'),
  addCustomer: action('addCustomer'),
  addComment: action('addComment'),
  updateDealDescription: action('updateDealDescription'),
};

const meta: Meta<typeof CRMPage> = {
  title: "CRM/Mock CRM Page",
  component: CRMPage,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CRMPage>;

export const Default: Story = {
  args: {
    // Pass the mock data and actions as props
    initialData: mockBoardData,
    actions,
  },
};

// Reset actions after each story
Default.play = async () => {
  Object.values(actions).forEach((action) => action());
};

