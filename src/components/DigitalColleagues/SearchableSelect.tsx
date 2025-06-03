
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SearchableSelectOption {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder?: string;
  allowCustomValue?: boolean;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  value,
  onValueChange,
  options,
  placeholder = 'Search...',
  allowCustomValue = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleCustomValue = () => {
    if (allowCustomValue && searchTerm.trim() && !options.find(opt => opt.value === searchTerm.trim())) {
      onValueChange(searchTerm.trim());
      setIsOpen(false);
      setSearchTerm('');
    }
  };
  
  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-600">{label}</Label>
      <Select value={value} onValueChange={handleSelect} open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger className="h-auto p-0 border-none bg-transparent hover:bg-gray-50 rounded-md">
          <Badge 
            variant="secondary" 
            className="cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedOption?.label || value || 'Select...'}
          </Badge>
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && allowCustomValue) {
                  handleCustomValue();
                }
              }}
              className="mb-2"
            />
          </div>
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
          {allowCustomValue && searchTerm.trim() && !filteredOptions.find(opt => opt.value === searchTerm.trim()) && (
            <SelectItem value={searchTerm.trim()}>
              Add "{searchTerm.trim()}"
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};
