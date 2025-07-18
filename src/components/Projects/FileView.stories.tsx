import type { Meta, StoryObj } from '@storybook/react';
import { FileText, FileImage, FileVideo, Music, File } from 'lucide-react';
import FileView from './FileView';
import { RecentFile } from '../DigitalColleagues/types';

const meta: Meta<typeof FileView> = {
  title: 'Projects/Views/FileView',
  component: FileView,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    compactView: {
      control: 'boolean',
      description: 'Whether to show the view in compact mode',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleFiles: RecentFile[] = [
  {
    name: "Project Proposal.docx",
    app: "Word",
    modified: "2 hours ago",
    icon: <FileText className="h-5 w-5" />,
    shared: true,
    size: "2.4 MB",
    collaborators: 3,
  },
  {
    name: "Budget_2024.xlsx",
    app: "Excel",
    modified: "1 day ago",
    icon: <FileText className="h-5 w-5" />,
    shared: false,
    size: "856 KB",
    collaborators: 0,
  },
  {
    name: "Design_mockups.png",
    app: "Photoshop",
    modified: "3 days ago",
    icon: <FileImage className="h-5 w-5" />,
    shared: true,
    size: "4.2 MB",
    collaborators: 5,
  },
  {
    name: "Training_video.mp4",
    app: "Media Player",
    modified: "1 week ago",
    icon: <FileVideo className="h-5 w-5" />,
    shared: false,
    size: "125 MB",
    collaborators: 0,
  },
  {
    name: "Meeting_notes.txt",
    app: "Notepad",
    modified: "2 weeks ago",
    icon: <FileText className="h-5 w-5" />,
    shared: true,
    size: "12 KB",
    collaborators: 2,
  },
  {
    name: "Presentation.pptx",
    app: "PowerPoint",
    modified: "3 weeks ago",
    icon: <File className="h-5 w-5" />,
    shared: false,
    size: "8.7 MB",
    collaborators: 0,
  },
  {
    name: "Audio_recording.mp3",
    app: "Audio Player",
    modified: "1 month ago",
    icon: <Music className="h-5 w-5" />,
    shared: true,
    size: "45 MB",
    collaborators: 1,
  },
];

export const Default: Story = {
  args: {
    initialFiles: sampleFiles,
    onFileAdd: (file) => console.log('File added:', file),
    onFileEdit: (file) => console.log('File edited:', file),
    onFileDelete: (fileId) => console.log('File deleted:', fileId),
    onFileClick: (file) => console.log('File clicked:', file),
  },
};

export const CompactView: Story = {
  args: {
    initialFiles: sampleFiles,
    compactView: true,
    onFileAdd: (file) => console.log('File added:', file),
    onFileEdit: (file) => console.log('File edited:', file),
    onFileDelete: (fileId) => console.log('File deleted:', fileId),
    onFileClick: (file) => console.log('File clicked:', file),
  },
};

export const EmptyState: Story = {
  args: {
    initialFiles: [],
    onFileAdd: (file) => console.log('File added:', file),
    onFileEdit: (file) => console.log('File edited:', file),
    onFileDelete: (fileId) => console.log('File deleted:', fileId),
    onFileClick: (file) => console.log('File clicked:', file),
  },
};

export const FewFiles: Story = {
  args: {
    initialFiles: sampleFiles.slice(0, 3),
    onFileAdd: (file) => console.log('File added:', file),
    onFileEdit: (file) => console.log('File edited:', file),
    onFileDelete: (fileId) => console.log('File deleted:', fileId),
    onFileClick: (file) => console.log('File clicked:', file),
  },
};
