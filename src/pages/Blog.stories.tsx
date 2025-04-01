import React from 'react'

import Website from './Blog'
import { fn } from '@storybook/test'
import { PhoneIcon, PlayCircleIcon, RectangleGroupIcon } from '@heroicons/react/20/solid'
import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon } from '@heroicons/react/24/outline'
import { DynamicIcon } from '@/components/Images'
import { Meta, StoryObj } from '@storybook/react'
import pattern1 from '@/images/hero/image-hero1.webp'

const GithubIcon = () => (
  // <FontAwesomeIcon icon={faGithub} size="10x" />
  <DynamicIcon iconName="github" size="4x" type="brands" />
)
const AWSIcon = () => <DynamicIcon iconName="aws" type="brands" />
const AzureIcon = () => <DynamicIcon iconName="azure" type="kit" />
const SolutionIcon = () => <DynamicIcon iconName="people-sharing" size="4x" type="kit" />

const ServiceIcon = () => <DynamicIcon iconName="cloud-network-sharing" size="4x" type="kit" />

const ProductIcon = () => <DynamicIcon iconName="development" size="4x" type="kit" />

export default {
  title: 'Example Pages/Blog',
  component: Website,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true, // 👈 Set this
    },
    docs: {
      description: {
        component: 'Example Blog page.',
      },
    },
  },
  // decorators: [
  //   (Story: React.FC) => (
  //     <div>
  //       <Story />
  //     </div>
  //   ),
  // ],
}

const Template = (args: any) => <Website {...args} />

type PageStory = StoryObj<typeof Website>

export const Default = {
  args: {
    // ...Default.args,
    hero: {
      type: 'postHero',
      post: {
        id: '1',
        title: 'Sample Post Title',
        categories: [
          { id: '1', title: 'Category 1' },
          { id: '2', title: 'Category 2' },
        ],
        meta: {
          image: { url: 'stock1.jpg' },
        },
        populatedAuthors: [
          {
            id: '1',
            name: 'Author 1',
            avatar: {
              id: '1',
              url: '/path/to/avatar1.jpg',
              alt: 'Author 1 Avatar',
            },
          },
          {
            id: '2',
            name: 'Author 2',
            avatar: {
              id: '2',
              url: '/path/to/avatar2.jpg',
              alt: 'Author 2 Avatar',
            },
          },
        ],
        publishedAt: '2023-10-01T12:00:00Z',
        content: 'Sample post content...',
      },
    },
    blog: {
      edit: true,
      categoryList: {
        title: 'Categories',
        links: [
          { label: 'Category 1', href: 1 },
          { label: 'Category 2', href: 2 },
          { label: 'Category 3', href: 3 },
        ],
      },
      page: {
        id: 2,
        title: 'Test Post 2',
        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,
            children: [
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum. Cras vehicula, libero a pharetra dictum, urna lectus porttitor lacus, at dapibus justo quam vel metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non velit nec arcu volutpat dignissim in a lorem.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Proin sagittis sem et elit fringilla, nec fringilla eros maximus. Nulla facilisi. Ut sit amet facilisis lectus. Fusce ornare metus at ante tristique, nec elementum eros fermentum. Integer volutpat magna sed justo tincidunt, sit amet aliquam arcu pellentesque. Phasellus imperdiet mi vitae ligula pharetra, a dignissim velit vehicula.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Suspendisse potenti. Donec malesuada arcu at velit laoreet convallis. Sed at eros vel lacus varius varius nec id metus. Praesent faucibus, orci a varius dapibus, lorem libero convallis est, et consequat libero magna sit amet risus. Maecenas tincidunt erat et felis sodales, nec malesuada sem tincidunt. Duis sed nisl euismod, ullamcorper augue at, rutrum felis.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    mode: 'normal',
                    text: 'Aenean ut ligula ac libero vehicula luctus. Integer ultricies nisl id mi dictum, eget tincidunt augue interdum. Sed eu malesuada erat. Nam fringilla lectus id dolor gravida lacinia. Aliquam erat volutpat. Vestibulum nec ipsum vitae elit dapibus suscipit vel at ipsum.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
            ],
            direction: 'ltr',
          },
        },
        relatedPosts: [],
        categories: [
          {
            id: 1,
            title: 'Test Category 1',
            slug: 'test-category-1',
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            _status: 'published',
          },
        ],
        meta: { title: 'Test Post 1', image: null, description: null },
        publishedAt: '2025-01-06T20:17:25.595Z',
        authors: [
          {
            id: 1,
            name: 'Rob',
            jobRole: null,
            profilePicture: null,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: null,
            joinDate: null,
            role: 'admin',
            sub: null,
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            enableAPIKey: null,
            apiKey: null,
            email: 'rob@sdsdd.com',
            loginAttempts: 0,
          },
          {
            id: 2,
            name: 'Dave',
            jobRole: null,
            profilePicture: null,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: null,
            joinDate: null,
            role: 'admin',
            sub: null,
            updatedAt: '2025-01-06T20:16:54.416Z',
            createdAt: '2025-01-06T20:16:54.416Z',
            enableAPIKey: null,
            apiKey: null,
            email: 'rob@sdsdd.com',
            loginAttempts: 0,
          },
        ],
        populatedAuthors: [{ id: 1, name: 'Rob Ellison' }],
        publishedToWebsite: false,
        slug: 'test-post-2',
        slugLock: true,
        updatedAt: '2025-01-06T20:17:31.465Z',
        createdAt: '2025-01-06T20:17:27.818Z',
        _status: 'published',
      },
    },
  },
}

export const AReallyLongTitle = {
  args: {
    ...Default.args,
    hero: {
      ...Default.args.hero,
      post: {
        ...Default.args.hero.post,
        title:
          'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
    },
  },
}

export const LotsOfFormatting = {
  args: {
    ...Default.args,
    blog: {
      edit: true,
      categoryList: {
        title: 'Categories',
        links: [
          { label: 'Category 1', href: 1 },
          { label: 'Category 2', href: 2 },
          { label: 'Category 3', href: 3 },
        ],
      },
      page: {
        id: 3,
        title: 'FinOps-enhanced GenAI: Inform, Optimise, Operate, Innovate',

        content: {
          root: {
            type: 'root',
            format: '',
            indent: 0,
            version: 1,

            children: [
              {
                tag: 'h4',
                type: 'heading',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'The Next Wave of IT Innovation: Generative AI',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'quote',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'paragraph',
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: '“Generative AI could expand to 10-12% of total information-technology hardware, software, services, advertising, and gaming expenditures by 2032 from less than 1% today, according to our analysis. Training of AI platforms (creating a machine-learning model using large datasets) will be key, driven initially by spending on servers and storage and eventually by cloud-related infrastructure” Bloomberg, 8th March 2024',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                    textStyle: '',
                    textFormat: 0,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: "Over the past six months, we have seen an increase in boardroom discussions about AI solutions. This is a clear indication that leadership recognises AI's transformative potential to enhance business operations and deliver significant value. ",
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'However, as exciting as these possibilities are, we must not overlook a critical factor: ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'cost',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: '.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Drive cost awareness in generative AI with FinOps',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'From a cost perspective, generative AI tools and applications follow the same principles as every other digital product implemented in the cloud.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'Organisations will use their existing FinOps processes and tools to:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Ingest and normalise cost and usage data',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Allocate and share the cost of cloud services',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Manage spend anomalies',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 4,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Define a budget for cloud spend and forecast digital product costs',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'When approaching generative AI, the main cost that a FinOps team should focus on is the one the organisation will be charged for model inference and customisation.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'This expense is caused by the consumption of computing resources every time an LLM is given an input (or prompt) in order to produce an output (or completion).',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Generative AI models break down text data into units called tokens for processing. The way text data is converted into tokens depends on the tokenizer used. A token can be characters, words, or phrases. Generative AI usually charges by every 1000 tokens of input (prompt) and output (response): i.e.:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'An application developer makes the following API calls to Amazon Bedrock in the US West (Oregon) Region: a request to Anthropic’s Claude model to summarise an input of 11K tokens of input text to an output of 4K tokens. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Total cost incurred = 11K tokens/1000 x $0.008 + 4K tokens/1000 x $0.024 = $0.088 + $0.096 = ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: '$0.184',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Cost-Effective GenAI: Design for Efficiency',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'The cost optimisation techniques supported by FinOps translate perfectly to the realm of generative AI. Just like any cloud-based service, GenAI tools incur ongoing expenses that require careful management. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'FinOps tenets like rightsizing resources, leveraging automation for cost control, and negotiating committed-use discounts with cloud providers can effectively be applied to GenAI. However, since inference is a major cost driver for GenAI products, we must architect solutions accurately. This ensures prompts minimise token counts while maintaining desired response accuracy, and uses the appropriate foundational model for maximum value.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: "To illustrate a poorly architected solution's cost impact, consider 200 large text documents (around 10,000 tokens each) containing detailed information on a specific topic. For each document, we want to distil the information into a concise summary and generate additional content based on that summary.",
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Lazy option',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'We decide to utilise the Claude 3 Sonnet model from AWS Bedrock, which would perform the task and produce 1000 tokens output',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Total cost = Claude (0.003 x 10 + 0.015 x 1) = 0.045$ for a single inference x 200 = ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '9$ for 200 summaries',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Well-architected option',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'We decide to implement a model chaining pattern, to separate the summarisation and the content creation stages. A simple Mistral 8*7B would create a 500 output tokens per document, feeding into Claude 3 Sonnet, to produce the same 1000 tokens output',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Total cost = Mistral (0.00045 x 10 + 0.0007 x 0.5) + Claude (0.003 x 0.5 + 0.015 x 1) = 0.021$ for a single inference x 200 = ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '4.2$ for 200 summaries',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'By carefully designing the solution (model selection and chaining), we achieved a ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '46% cost saving',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' without compromising accuracy.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'When building a chaining model for your AI implementation, using the right LLM at each stage is key to keeping costs low. For example, if you have to implement ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'pre-scanning',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' and ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'post-scanning',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: ' of a user inference, each potentially requires a separate LLM.  ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'A poorly architected chaining model can incur LLM charges that are ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '100 times higher',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' than necessary.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'Here are a few ideas for a well-architected AI pattern:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Use smaller, task-specific models for pre-scanning (intent) and post-scanning (response generation). This leverages their strengths and avoids paying for unnecessary capabilities.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Hard-code common responses (confirmations, refusals, etc.) to eliminate LLM usage entirely.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Pre-compute responses for limited user inputs (e.g. category selections) and store them for retrieval, minimising real-time LLM calls.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Let us look at another scenario: ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'An e-commerce chatbot is designed to handle customer inquiries about product availability and order status. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 1,
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Poorly Architected Approach',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 9,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 9,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Single Powerful LLM',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: "The developers use a single, powerful LLM for both pre-scanning and post-scanning ($0.06 per 1,000 tokens). This LLM requires processing 100 tokens per user interaction (including the user's question and the system's response). ",
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'High Cost: Every user interaction, even simple ones, requires processing by this expensive LLM. This translates to a cost of $0.06 per 1,000 tokens x 100 tokens/interaction = $0.006 per interaction.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Cost Breakdown',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 1,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Assuming the chatbot handles 10,000 interactions per day, the daily cost would be $0.006/interaction x 10,000 interactions = $60.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'This translates to a monthly cost of $60/day x 30 days = ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                      {
                        mode: 'normal',
                        text: '$1800',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: '.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Well-Architected Approach',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 9,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 9,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Specialised LLMs',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: "Pre-scanning: A smaller LLM, optimised for intent recognition, analyses the user's question. It requires just 20 tokens for processing and costs $0.003 per 1,000 tokens.",
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Post-scanning: Another, even smaller LLM, retrieves product information and order details from the database and generates a concise response, requiring 50 tokens. This LLM costs $0.006 per 1,000 tokens.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 4,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Hard-coding: The chatbot is programmed with pre-defined responses for common inquiries, eliminating LLM processing for these interactions altogether. Cost is null.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 5,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Pre-computing: For product categories with a limited number of options, pre-generated responses for availability can be stored. The chatbot retrieves the appropriate response based on user selection, further minimising LLM usage. Cost is also null.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Cost Breakdown',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 1,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Pre-scanning LLM: $.003 per 1,000 tokens x 20 tokens/interaction = $0.00006 per interaction ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Post-scanning LLM: $.006 per 1,000 tokens x 50 tokens/interaction = $0.0003 per interaction',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Hard-coded and pre-computed responses: $0 cost',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Assuming an even split between pre-scanning and post-scanning interactions (5,000 each per day), the total daily cost becomes:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Pre-scanning cost: $0.00006/interaction x 5,000 interactions = $0.3',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Post-scanning cost: $0.0003/interaction x 5,000 interactions = $1.5',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Hard-coded/pre-computed responses: $0 cost',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Combined, the daily cost is $1.8. This translates to a monthly cost of $1.8/day x 30 days = ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '$54',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'By implementing a ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'well-architected',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' design, this example demonstrates a potential ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: '97% reduction',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' in monthly costs ($1800 vs $54) by using specialised LLMs, hard-coded responses, and pre-computed responses. This highlights the substantial financial benefits of a well-architected chaining model for your AI chatbot.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'A further approach to enhancing performance and minimising the total cost of ownership (TCO) for GenAI products is ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Retrieval-Augmented Generation',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 1,
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: ' (RAG). RAG optimises the workload for foundational models by pre-selecting relevant information. Instead of requiring the expensive generative model to process information from scratch, RAG efficiently reduces the volume of text the model needs to handle. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'This is achieved by first retrieving pertinent information from a knowledge base or corpus, and then augmenting the generative model with this pre-selected, relevant context only. By avoiding the need to process irrelevant information, RAG leads to fewer tokens being processed by the costly model, subsequently lowering inference costs while maintaining high-quality outputs.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'However, to implement RAG a number of Cloud services (compute, storage, network, etc) need to be deployed, and this will increase the overall TCO for the implementation, as explored in detail further below.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'The right model for the right application',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: "Various models come with diverse computational needs and functionalities. Opting for a model that aligns well with the project's objectives, without overcomplicating with unnecessary features, can notably reduce overall expenses.",
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'The factors that may influence the choice of a Generative AI foundational model for your application are multiple, i.e.:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Task type',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Accuracy',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Performance',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 4,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Supported number of input/output tokens',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 5,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Multi-language support',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Considering such factors is key to ensure the maximisation of business value of the generative AI application because, even within a single family of models, there is a wide range of options available, each with a significantly different cost associated with it.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'Let’s take the AWS offering as an example below which displays On-demand and batch pricing for Anthropic AI models on AWS Bedrock. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'table',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Model',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 3,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Price per 1,000 input tokens',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' Price per 1,000 output tokens',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Claude Instant',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: '$0.0008',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.0024',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: null,
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Claude 2.0/2.1 ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.008  ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.024',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: null,
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Claude 3 Opus    ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.015 ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.075',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: null,
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Claude 3 Sonnet ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.003',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.015',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: null,
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Claude 3 Haiku  ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.00025  ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: ' $0.00125',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: null,
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: null,
                  },
                ],

                colWidths: [199, 323, 347],
                direction: null,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'The price difference between Claude Instant and Opus models is significant. The table below explores the reasons behind this. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'table',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Model',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 3,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Max Tokens',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 1,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Languages',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 1,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Use Cases',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 1,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 1,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 1,
                        backgroundColor: null,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Instant ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: '100K',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'English and multiple other languages',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Casual dialogue, text analysis, summarisation, and document comprehension.',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'tablerow',
                    format: '',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Opus ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 2,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: '200K',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'English, Spanish, Japanese, and multiple other languages ',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: 'center',
                            indent: 0,
                            version: 1,

                            children: [
                              {
                                mode: 'normal',
                                text: 'Task automation, interactive coding, research review, brainstorming and hypothesis generation, advanced analysis of charts and graphs, financials and market trends, forecasting',
                                type: 'text',
                                style: '',
                                detail: 0,
                                format: 0,
                                version: 1,
                              },
                            ],
                            direction: 'ltr',
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                      {
                        type: 'tablecell',
                        format: '',
                        indent: 0,
                        colSpan: 1,
                        rowSpan: 1,
                        version: 1,

                        children: [
                          {
                            type: 'paragraph',
                            format: '',
                            indent: 0,
                            version: 1,
                            children: [],
                            direction: null,
                            textStyle: '',
                            textFormat: 0,
                          },
                        ],
                        direction: 'ltr',
                        headerState: 0,
                        backgroundColor: null,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],

                colWidths: [92, 110, 152, 552, 552],
                direction: null,
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'The pricing data highlights the importance of selecting the appropriate model for your use case. Opting for the wrong model could result in costs that are nearly 20 times higher than necessary, significantly impacting the overall implementation expenses.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Larger and more complex models like GPT-3 or PaLM require significantly more computational resources for training and inference, leading to higher costs. Selecting a smaller, more efficient model can reduce costs if the application does not require the full capabilities of a larger model. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'For instance, Anthropic Claude 3 Sonnet, with its larger context size of 12K tokens, excels at complex tasks like dialogues and creative content generation but costs $0.003 per 1K tokens on Amazon Bedrock. In contrast, the simpler Amazon Titan Text Express, suitable for summarisation and basic text generation, is nearly four times cheaper at $0.0008 per 1K tokens. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Considering this, if we want to implement a digital platform that aggregates news articles from various sources and delivers curated content to users based on their preferences and interests, the Amazon Titan Text might be the right foundational model of choice to optimise costs.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'Another example: let us consider the use case of building an AI assistant for customer service. The OpenAI GPT-3 Davinci model, with its impressive language understanding and generation capabilities, might seem like a natural choice. However, at $0.06 per 1,000 input tokens and $0.06 per 1,000 output tokens, it could quickly become cost-prohibitive for high-volume interactions. On the other hand, the more specialised Anthropic Claude Instant, designed for conversational AI, offers a more cost-effective solution at $0.0008 per 1,000 input tokens and $0.0024 per 1,000 output tokens.   ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'Given the requirement for real-time, interactive responses in customer service scenarios, the Claude Instant model could potentially deliver the necessary performance at a fraction of the cost, making it the more suitable option for this particular implementation.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'There are more costs to consider',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Frequently, when integrating generative AI services within an organisation, it is required to provide domain context to a Generative AI foundation model. This need arises in various scenarios where the model must produce outputs tailored to a specific domain or industry.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'As explained before, a Retrieval-Augmented Generation (RAG) approach can help provide domain context to a generative AI foundation model. RAG is a technique that combines a pre-trained language model (like GPT-3 or BERT) with a retrieval system (like a search engine or knowledge base). The retrieval system is used to fetch relevant documents or passages from a corpus of domain-specific data, which can then be used to augment the context provided to the language model.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'However, it is important to note that the implementation of such process will need several additional cloud services for each step, i.e.:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Data storage  ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'AWS S3, Azure Storage Account or GCP bucket ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Data Cleanup ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'AWS Glue, Azure ML studio or Vertex AI',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Vector embedding ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'AWS OpenSearch with k-nn, Azure CosmosDB for PostgreSQL or Vertex AI Vector Search',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'To manage the TCO of the AI implementation there are standard optimisation patterns that can be applied to these services:',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'ul',
                type: 'list',
                start: 1,
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    type: 'listitem',
                    value: 1,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Tiered Storage ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'Leverage cost-effective storage options like lifecycle management policies in AWS S3, Azure Blob Storage Archive tier in Azure Storage Account, or Coldline storage class in GCP buckets to archive infrequently accessed data.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 2,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Serverless Data Processing ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'Explore serverless data processing services like AWS Glue ETL jobs or Azure Data Factory pipelines to clean and prepare data efficiently, minimising resource usage.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 3,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Pay-per-use Vector Embedding ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'Utilise managed services with pay-per-use pricing models, like Amazon OpenSearch with Elasticsearch Service for vector embedding and k-nearest neighbours search or consider cost-effective alternatives like Faiss for GPU-based similarity search within Azure Cognitive Services.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                  {
                    type: 'listitem',
                    value: 4,
                    format: 'start',
                    indent: 0,
                    version: 1,

                    children: [
                      {
                        mode: 'normal',
                        text: 'Automated Training Pipelines ',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 1,
                        version: 1,
                      },

                      {
                        mode: 'normal',
                        text: 'Consider Vertex AI Pipelines in GCP or Azure Machine Learning pipelines to automate and potentially optimise training workflows for the RAG model, potentially reducing training costs. Explore SageMaker Neo for efficient model deployment on AWS or leverage cost-effective containerisation technologies like Docker for deployment across cloud providers.',
                        type: 'text',
                        style: '',
                        detail: 0,
                        format: 0,
                        version: 1,
                      },
                    ],
                    direction: 'ltr',
                  },
                ],
                listType: 'bullet',
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: null,
                textStyle: '',
                textFormat: 0,
              },
              {
                tag: 'h4',
                type: 'heading',
                format: '',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'Conclusion',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
              },
              {
                type: 'paragraph',
                format: 'start',
                indent: 0,
                version: 1,

                children: [
                  {
                    mode: 'normal',
                    text: 'As AI workloads continue to grow in complexity and scale, effective FinOps practices become increasingly crucial for organisations to manage their cloud costs and optimise resource utilisation. ',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    mode: 'normal',
                    text: 'By adopting the right AI architectural patterns, implementing cost monitoring and optimisation strategies, organisations can strike the right balance between innovation and fiscal responsibility.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },
                  {
                    type: 'linebreak',
                    version: 1,
                  },

                  {
                    mode: 'normal',
                    text: 'Embracing FinOps principles enables organisations to future-proof their AI investments, ensuring sustainable growth and a competitive edge in the rapidly evolving AI landscape.',
                    type: 'text',
                    style: '',
                    detail: 0,
                    format: 0,
                    version: 1,
                  },
                ],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },

              {
                type: 'paragraph',
                format: '',
                indent: 0,
                version: 1,
                children: [],
                direction: 'ltr',
                textStyle: '',
                textFormat: 0,
              },
            ],
            direction: 'ltr',
          },
        },
        relatedPosts: [],

        categories: [
          {
            id: 2,
            title: 'FinOps',
            parent: null,

            breadcrumbs: [
              {
                id: '677a812ddf2f2500016a05f5',
                doc: 2,
                url: null,
                label: 'FinOps',
              },
            ],
            updatedAt: '2025-01-05T12:55:09.500Z',
            createdAt: '2025-01-05T12:55:09.480Z',
          },
        ],
        meta: {
          title: 'FinOps-enhanced GenAI | Cortex Reply | AI that works for you',

          image: {
            id: 119,
            alt: 'FinOps-enhanced GenAI: Inform, Optimise, Operate, Innovate',
            prefix: 'media',
            updatedAt: '2025-04-01T09:06:10.720Z',
            createdAt: '2025-04-01T09:06:07.529Z',
            url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu.jpg',
            thumbnailURL: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-300x200.jpg',
            filename: 'zZpFFeluQXVexiYXUJ6lu.jpg',
            mimeType: 'image/jpeg',
            filesize: 227036,
            width: 2121,
            height: 1414,
            focalX: 50,
            focalY: 50,

            sizes: {
              thumbnail: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-300x200.jpg',
                width: 300,
                height: 200,
                mimeType: 'image/jpeg',
                filesize: 6658,
                filename: 'zZpFFeluQXVexiYXUJ6lu-300x200.jpg',
              },
              square: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-500x500.jpg',
                width: 500,
                height: 500,
                mimeType: 'image/jpeg',
                filesize: 35848,
                filename: 'zZpFFeluQXVexiYXUJ6lu-500x500.jpg',
              },
              small: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-600x400.jpg',
                width: 600,
                height: 400,
                mimeType: 'image/jpeg',
                filesize: 27963,
                filename: 'zZpFFeluQXVexiYXUJ6lu-600x400.jpg',
              },
              medium: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-900x600.jpg',
                width: 900,
                height: 600,
                mimeType: 'image/jpeg',
                filesize: 59628,
                filename: 'zZpFFeluQXVexiYXUJ6lu-900x600.jpg',
              },
              large: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-1400x933.jpg',
                width: 1400,
                height: 933,
                mimeType: 'image/jpeg',
                filesize: 121948,
                filename: 'zZpFFeluQXVexiYXUJ6lu-1400x933.jpg',
              },

              xlarge: {
                url: '/api/media/file/zZpFFeluQXVexiYXUJ6lu-1920x1280.jpg',
                width: 1920,
                height: 1280,
                mimeType: 'image/jpeg',
                filesize: 195431,
                filename: 'zZpFFeluQXVexiYXUJ6lu-1920x1280.jpg',
              },
            },
          },
          description:
            'See how FinOps enhances GenAI by optimising costs, boosting efficiency, and driving innovation with informed financial and operational strategies.',
        },
        publishedAt: '2025-02-18T16:04:50.489Z',
        authors: [
          {
            id: 16,
            name: 'Derek Ho',
            email: 'd.ho@reply.com',
            jobRole: 'SC2',
            manager: 2,
            about: 'Senior AI & Cloud Consultant',
            profilePicture: 12,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: '2020-10-15T12:00:00.000Z',
            joinDate: '2021-08-09T12:00:00.000Z',
            linkedIn: 'www.linkedin.com/in/derekmhho',
            role: 'user',
            updatedAt: '2025-03-17T09:43:57.552Z',
            createdAt: '2025-01-13T10:49:09.359Z',
            enableAPIKey: null,
            apiKey: null,
          },

          {
            id: 12,
            name: 'Ben Num',
            email: 'b.num@reply.com',
            jobRole: 'C2',
            manager: 3,
            about: null,
            profilePicture: 15,
            workHistory: [],
            certifications: [],
            areasOfExpertise: [],
            dateOfBirth: '2025-12-29T12:00:00.000Z',
            joinDate: '2023-09-11T12:00:00.000Z',
            linkedIn: null,
            role: 'user',
            updatedAt: '2025-02-12T15:25:13.837Z',
            createdAt: '2025-01-10T14:07:25.875Z',
            enableAPIKey: null,
            apiKey: null,
          },
        ],
        populatedAuthors: [
          {
            id: '16',
            name: 'Derek Ho',
          },

          {
            id: '12',
            name: 'Ben Num',
          },
        ],
        slug: 'finops-enhanced-genai-inform-optimise-operate-innovate',
        slugLock: true,
        updatedAt: '2025-04-01T10:03:00.931Z',
        createdAt: '2025-03-31T20:28:04.118Z',
      },
    },
  },
}
