
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TaskSelectOption {
  value: string;
  label: string;
  color?: string;
}

interface TaskSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: TaskSelectOption[];
  showColor?: boolean;
}

export const TaskSelect: React.FC<TaskSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  showColor = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedOption = options.find(option => option.value === value);
  
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Select value={value} onValueChange={onValueChange} open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger className="h-auto p-0 border-none bg-transparent hover:bg-muted/50 rounded-md">
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {showColor && selectedOption?.color && (
              <div className={`w-2 h-2 rounded-full ${selectedOption.color} mr-1`}></div>
            )}
            {selectedOption?.label || 'Select...'}
          </Badge>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {showColor && option.color ? (
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${option.color}`}></div>
                  {option.label}
                </div>
              ) : (
                option.label
              )}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
