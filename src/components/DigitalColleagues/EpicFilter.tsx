
import React from 'react';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Epic } from './types';

interface EpicFilterProps {
  epics: Epic[];
  selectedEpics: string[];
  onSelectionChange: (selectedEpics: string[]) => void;
}

export const EpicFilter: React.FC<EpicFilterProps> = ({
  epics,
  selectedEpics,
  onSelectionChange,
}) => {
  const handleEpicToggle = (epicId: string) => {
    if (selectedEpics.includes(epicId)) {
      onSelectionChange(selectedEpics.filter(id => id !== epicId));
    } else {
      onSelectionChange([...selectedEpics, epicId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedEpics.length === epics.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(epics.map(epic => epic.id));
    }
  };

  return (
    <Card className="p-4 bg-card shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-foreground">Filter by Epic</h3>
          <button
            onClick={handleSelectAll}
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            {selectedEpics.length === epics.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        
        <div className="space-y-2">
          {epics.map(epic => (
            <div key={epic.id} className="flex items-center space-x-3">
              <Checkbox
                id={epic.id}
                checked={selectedEpics.includes(epic.id)}
                onCheckedChange={() => handleEpicToggle(epic.id)}
              />
              <div className="flex items-center gap-2 flex-1">
                <div className={`w-3 h-3 rounded-full ${epic.color}`}></div>
                <label
                  htmlFor={epic.id}
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                >
                  {epic.name}
                </label>
              </div>
            </div>
          ))}
        </div>
        
        {selectedEpics.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <Badge variant="secondary" className="text-xs">
              {selectedEpics.length} of {epics.length} epics selected
            </Badge>
          </div>
        )}
      </div>
    </Card>
  );
};
