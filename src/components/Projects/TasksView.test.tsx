import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TasksView } from './TasksView';
import type { Reminder, DigitalColleague } from './TasksView';

// Mock colleagues for testing
const mockColleagues: DigitalColleague[] = [
  { id: '1', name: 'Alex AI', department: 'Development', role: 'Senior Developer' },
  { id: '2', name: 'Maya Bot', department: 'Design', role: 'UX Designer' },
];

// Mock reminders for testing
const mockReminders: Reminder[] = [
  {
    id: '1',
    title: 'Test reminder',
    description: 'This is a test reminder',
    dueDate: new Date(2024, 2, 15),
    dueTime: '14:30',
    colleague: mockColleagues[0],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(2024, 2, 10),
    tags: ['test']
  },
];

describe('TasksView', () => {
  it('renders the TasksView component', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('Task Reminders')).toBeInTheDocument();
    expect(screen.getByText('Test reminder')).toBeInTheDocument();
  });

  it('displays stats correctly', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('1')).toBeInTheDocument(); // Total count
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });

  it('can toggle reminder completion', () => {
    const mockOnUpdate = jest.fn();
    
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
        onUpdateReminder={mockOnUpdate}
      />
    );
    
    const checkButton = screen.getByRole('button', { name: /toggle complete/i });
    fireEvent.click(checkButton);
    
    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      isCompleted: true,
      completedAt: expect.any(Date)
    });
  });

  it('can filter reminders', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    const filterSelect = screen.getByRole('combobox');
    fireEvent.click(filterSelect);
    
    expect(screen.getByText('All (1)')).toBeInTheDocument();
    expect(screen.getByText('Pending (1)')).toBeInTheDocument();
  });

  it('can search reminders', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search reminders...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(screen.getByText('Test reminder')).toBeInTheDocument();
  });

  it('shows empty state when no reminders', () => {
    render(
      <TasksView
        initialReminders={[]}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('No reminders yet')).toBeInTheDocument();
    expect(screen.getByText('Create your first reminder to get started')).toBeInTheDocument();
  });
});
